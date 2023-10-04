import { IUser, IUserFilters } from "App/Interfaces/UserInterfaces";
import { IWorkEntity, IWorkEntityFilters } from "App/Interfaces/WorkEntityInterfaces";
import WorkEntity from "App/Models/WorkEntity";
import { IAuthExternalService } from "App/Services/External/Contracts/IAuthExternalService";
import { IPagingData } from "App/Utils/ApiResponses";
import { IWorkEntityRepository } from "./Contracts/IWorkEntityRepository";
import TetTipoEntidadTrabajo from "App/Models/TetTipoEntidadTrabajo";
import { IWorkEntityType } from "App/Interfaces/WorkEntityTypeInterface";
import PrgPrograma from "App/Models/PrgPrograma";
import { IProgram } from "App/Interfaces/ProgramInterfaces";

export default class WorkEntityRepository implements IWorkEntityRepository {
  constructor(private AuthExternalService: IAuthExternalService) {}
  async createWorkEntity(workEntity: IWorkEntity): Promise<IWorkEntity | null> {
    const last = await WorkEntity.query().orderBy('id', 'desc').first()
    const res = await WorkEntity.create({
      name: workEntity?.name,
      workEntityTypeId: workEntity?.workEntityTypeId,
      userId: workEntity?.userId,
      order: last?.id ?? 0
    });
    return await this.formatWorkEntity(res);
  }

  async getUserByDocument(identification: string): Promise<IUser | null> {
    return (await this.AuthExternalService.getUserByDocument(identification)).data;
  }

  async getWorkEntityById(id: number): Promise<IWorkEntity | null> {
    const workEntity = await WorkEntity.find(id);
    return await this.formatWorkEntity(workEntity);
  }

  async getWorkEntityTypes(): Promise<IWorkEntityType[]> {
    const res = await TetTipoEntidadTrabajo.query().orderBy("tet_orden");
    return res.map((workEntityType) => workEntityType.serialize() as IWorkEntityType);
  }

  async getProgramsAffairs(): Promise<IProgram[]> {
    const res = await PrgPrograma.query().preload("affairs");
    return res.map((program) => program.serialize() as IProgram);
  }

  async getWorkEntityByUserId(id: number): Promise<IWorkEntity | null> {
    const workEntity = await WorkEntity.query().where("userId", id).first();
    return await this.formatWorkEntity(workEntity);
  }

  private async formatWorkEntities(workEntities: WorkEntity[], user: IUser | null = null): Promise<IWorkEntity[]> {
    let workEntitiesFormatted: IWorkEntity[] = [];
    let ids = workEntities.map(workentity => workentity.userId);
    const users = (await this.AuthExternalService.getUsersByIds(ids)).data;
    for await (const workEntity of workEntities) {
      let workEntityFormatted = await this.formatWorkEntity(workEntity, users.filter(user=> user.id == workEntity.userId)[0]);
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
        user = (await this.AuthExternalService.getUserById(workEntity.userId)).data;
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
    const { meta } = workEntitiesPagination.serialize();
    let serializeWorkEntity = await this.formatWorkEntities(workEntitiesPagination.all(), user);

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
