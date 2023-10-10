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
import EntityAffairsProgram from "App/Models/EntityAffairsProgram";

export default class WorkEntityRepository implements IWorkEntityRepository {
  constructor(private AuthExternalService: IAuthExternalService) {}
  async createWorkEntity(workEntity: IWorkEntity): Promise<IWorkEntity | null> {
    const last = await WorkEntity.query().orderBy("id", "desc").first();
    const res = await WorkEntity.create({
      name: workEntity?.name,
      workEntityTypeId: workEntity?.workEntityTypeId,
      userId: workEntity?.userId,
      order: last?.id ?? 0,
    });
    if (workEntity?.affairsPrograms) {
      await EntityAffairsProgram.createMany(
        workEntity.affairsPrograms.map((affairProgram) => {
          affairProgram.workEntityId = res.id;
          delete affairProgram.id;
          return affairProgram;
        })
      );
    }
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
    return res.map((program) => {
      let serializeProgram: IProgram = program.serialize();
      program.affairs.forEach((affairProgram, index) => {
        if (serializeProgram?.affairs && serializeProgram.affairs[index]) {
          serializeProgram.affairs[index].affairProgramId = affairProgram?.$extras?.pivot_PRA_CODIGO;
        }
      });
      return serializeProgram;
    });
  }

  async getWorkEntityByUserId(id: number): Promise<IWorkEntity | null> {
    const workEntity = await WorkEntity.query().where("userId", id).first();
    return await this.formatWorkEntity(workEntity);
  }

  private async formatWorkEntities(workEntities: WorkEntity[], user: IUser | null = null): Promise<IWorkEntity[]> {
    let workEntitiesFormatted: IWorkEntity[] = [];
    let ids = workEntities.map((workentity) => workentity.userId);
    let users = user ? [user] : [];
    if (!users.length) {
      users = (await this.AuthExternalService.getUsersByIds(ids)).data;
    }
    for await (const workEntity of workEntities) {
      let workEntityFormatted = await this.formatWorkEntity(
        workEntity,
        users.filter((user) => user.id == workEntity.userId)[0]
      );
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
      await workEntity.load("affairsPrograms");
      if (!user) {
        user = (await this.AuthExternalService.getUserById(workEntity.userId)).data;
      }

      serializeWorkEntity = workEntity.serialize() as IWorkEntity;
      serializeWorkEntity.user = user;
    }
    return serializeWorkEntity;
  }

  async getUserByFilters(filters: IWorkEntityFilters, all: boolean=false): Promise<{
    filterUser: boolean;
    user: IUser|(IUser | null)[]|null;
  }> {
    let userFilters: IUserFilters = {
      page: 1,
      perPage: 1,
      numberDocument: filters?.identification,
      email: filters?.email,
      lastNames: filters?.lastNames,
      names: filters?.names,
    };
    let filterUser = false;
    let user: IUser|(IUser | null)[]|null = null;
    if (userFilters?.email || userFilters?.lastNames || userFilters?.names || userFilters?.numberDocument) {
      filterUser = true;
      const existUser = await this.AuthExternalService.searchUser(userFilters);
      if (all) {
        user = existUser.data.array;
      }else{
        user = existUser.data.array[0];
      }
    }
    return {
      filterUser,
      user,
    };
  }

  async getWorkEntityByFilters(filters: IWorkEntityFilters): Promise<IPagingData<IWorkEntity | null>> {
    let { filterUser, user } = await this.getUserByFilters(filters);
    user = user as (IUser|null)
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
    const res = await WorkEntity.findOrFail(workEntity?.id);
    res.name = workEntity.name;
    res.userId = workEntity.userId;
    await res.save();
    await res.load("affairsPrograms");
    await EntityAffairsProgram.query()
      .whereIn(
        "id",
        res.affairsPrograms.map((affairProgram) => {
          return affairProgram.id;
        })
      )
      .delete();
    if (workEntity?.affairsPrograms) {
      await EntityAffairsProgram.createMany(
        workEntity.affairsPrograms.map((affairProgram) => {
          affairProgram.workEntityId = res.id;
          delete affairProgram.id;
          delete affairProgram.createdAt;
          delete affairProgram.updatedAt;
          return affairProgram;
        })
      );
    }
    return await this.formatWorkEntity(res);
  }
}
