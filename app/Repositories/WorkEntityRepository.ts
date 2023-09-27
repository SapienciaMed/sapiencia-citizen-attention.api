import Database from "@ioc:Adonis/Lucid/Database";
import { EGrouperCodes } from "App/Constants/GrouperCodesEnum";
import { IWorkEntity, IWorkEntityFilters } from "App/Interfaces/WorkEntityInterfaces";
import File from "App/Models/File";
import WorkEntity from "App/Models/WorkEntity";
import { IAuthExternalService } from "App/Services/External/Contracts/IAuthExternalService";
import { IWorkEntityRepository } from "./Contracts/IWorkEntityRepository";
import { IUser, IUserFilters } from "App/Interfaces/UserInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";

export default class WorkEntityRepository implements IWorkEntityRepository {
  constructor(private AuthExternalService: IAuthExternalService) {}
  async createWorkEntity(workEntity: IWorkEntity): Promise<IWorkEntity | null> {
    let res: any;
    /* await Database.transaction(async (trx) => {
      if (workEntity?.person) {
        const existPerson = await Person.query().where("identification", workEntity.person.identification).first();
        const newPerson = existPerson
          ? existPerson.useTransaction(trx)
          : (await Person.create(workEntity.person)).useTransaction(trx);

        //TODO UPLOAD
        let upload = true;
        //workEntity.file?.name = rutaResultadoDeUpload;
        const newFile = workEntity?.file && upload ? (await File.create(workEntity?.file)).useTransaction(trx) : null;
        if (newFile) {
          workEntity.fileId = newFile.id;
        }
        const lastFilingNumber = await WorkEntity.query().orderBy("filingNumber", "desc").first();
        workEntity.filingNumber = lastFilingNumber?.filingNumber
          ? lastFilingNumber.filingNumber
          : parseInt(new Date().getFullYear().toString() + "02430001");
        const newWorkEntity = await newPerson.related("workEntitys").create(workEntity);
        res = await this.formatWorkEntity(newWorkEntity);

        //TODO EMAIL
      }
    }); */
    return res?.id ? res : null;
  }

  async getUserByDocument(identification: string): Promise<IUser | null> {
    return (await this.AuthExternalService.getUserByDocument(identification)).data;
  }

  async getWorkEntityById(id: number): Promise<IWorkEntity | null> {
    const workEntity = await WorkEntity.find(id);
    let serializeWorkEntity: IWorkEntity | null = await this.formatWorkEntity(workEntity);

    return serializeWorkEntity?.id ? serializeWorkEntity : null;
  }

  private async formatWorkEntities(workEntities: WorkEntity[], user: IUser | null = null): Promise<IWorkEntity[]> {
    let workEntitiesFormatted: IWorkEntity[] = [];
    for await (const workEntity of workEntities) {
      let workEntityFormatted = await this.formatWorkEntity(workEntity, user);
      if (workEntityFormatted) {
        workEntitiesFormatted.push(workEntityFormatted);
      }
    }
    return workEntitiesFormatted;
  }

  private async formatWorkEntity(
    workEntity: WorkEntity | null,
    user: IUser | null = null
  ): Promise<IWorkEntity | null> {
    let serializeWorkEntity: any;
    if (workEntity) {
      await workEntity.load("workEntityType");
      if (!user) {
        user = (await this.AuthExternalService.getUserById(workEntity.id)).data;
      }

      serializeWorkEntity = workEntity.serialize() as IWorkEntity;
      serializeWorkEntity.user = user;
    }
    return serializeWorkEntity;
  }

  async getWorkEntityByFilters(filters: IWorkEntityFilters): Promise<IPagingData<IWorkEntity | null>> {
    let userFilters: IUserFilters = {
      page: 1,
      perPage: 1,
      numberDocument: filters?.identification,
      email: filters?.email,
      lastNames: filters?.lastNames,
      names: filters?.names,
    };
    let filterUser = false;
    let user: any = null;
    if (userFilters?.email || userFilters?.lastNames || userFilters?.names || userFilters?.numberDocument) {
      filterUser = true;
      const existUser = await this.AuthExternalService.searchUser(userFilters);
      user = existUser.data.array[0];
    }

    if (filterUser && !user) {
      return {
        array: [],
        meta: {
          total: 0,
        },
      };
    }

    const query = WorkEntity.query();
    if (filterUser && user?.id) {
      query.where("userId", user.id);
    }
    if (filters?.name) {
      query.whereILike("name", `%${filters.name}%`);
    }
    if (filters?.id) {
      query.where("id", filters.id);
    }
    if (filters?.workEntityTypeId) {
      query.where("workEntityTypeId", filters.workEntityTypeId);
    }
    const workEntitiesPagination = await query
      .orderBy("order", "desc")
      .paginate(filters?.page ?? 1, filters?.perPage ?? 10);
    const { data, meta } = workEntitiesPagination.serialize();
    let serializeWorkEntity = await this.formatWorkEntities(data as WorkEntity[], user);

    return {
      array: serializeWorkEntity,
      meta,
    };
  }

  async getWorkEntitys(): Promise<[] | IWorkEntity[]> {
    return [];
  }

  async updateWorkEntity(workEntity: IWorkEntity): Promise<IWorkEntity | null> {
    return workEntity;
  }
}
