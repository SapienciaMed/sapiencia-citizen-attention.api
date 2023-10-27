import {
  IRequestObject,
  IRequestSubjectType,
  IRequestSubjectTypeFilters,
} from "App/Interfaces/RequestSubjectTypeInterfaces";
import ObsObjectoSolicitud from "App/Models/ObsObjectoSolicitud";
import RequestSubjectType from "App/Models/RequestSubjectType";
import RequestSubjectTypeProgram from "App/Models/RequestSubjectTypeProgram";
import { IPagingData } from "App/Utils/ApiResponses";
import { IRequestSubjectTypeRepository } from "./Contracts/IRequestSubjectTypeRepository";

export default class RequestSubjectTypeRepository implements IRequestSubjectTypeRepository {
  async createRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<IRequestSubjectType | null> {
    const res = await RequestSubjectType.create({
      name: requestSubjectType?.name,
      requestObjectId: requestSubjectType?.requestObjectId,
    });
    if (requestSubjectType?.programs) {
      await RequestSubjectTypeProgram.createMany(
        requestSubjectType.programs.map((program) => {
          return {
            programId: program.prg_codigo,
            requestSubjectId: res.id,
          };
        })
      );
    }
    return await this.formatRequestSubjectType(res);
  }

  async getRequestSubjectTypeByName(name: string): Promise<IRequestSubjectType | null> {
    const requestSubjectType = await RequestSubjectType.query().where("name", name).first();
    return requestSubjectType as IRequestSubjectType;
  }

  async getRequestSubjectTypeById(id: number): Promise<IRequestSubjectType | null> {
    const requestSubjectType = await RequestSubjectType.find(id);
    return await this.formatRequestSubjectType(requestSubjectType);
  }

  async getRequestObjects(): Promise<IRequestObject[]> {
    const res = await ObsObjectoSolicitud.query().orderBy("obs_orden");
    return res.map((requestObject) => requestObject.serialize() as IRequestObject);
  }

  private async formatRequestSubjectTypes(requestSubjectTypes: RequestSubjectType[]): Promise<IRequestSubjectType[]> {
    let requestSubjectTypesFormatted: IRequestSubjectType[] = [];
    for await (const requestSubjectType of requestSubjectTypes) {
      let requestSubjectTypeFormatted = await this.formatRequestSubjectType(requestSubjectType);
      if (requestSubjectTypeFormatted) {
        requestSubjectTypesFormatted.push(requestSubjectTypeFormatted);
      }
    }
    return requestSubjectTypesFormatted;
  }

  private async formatRequestSubjectType(
    requestSubjectType: RequestSubjectType | null
  ): Promise<IRequestSubjectType | null> {
    let serializeRequestSubjectType: any;
    if (requestSubjectType) {
      await requestSubjectType.load("requestObject");
      await requestSubjectType.load("programs");

      serializeRequestSubjectType = requestSubjectType.serialize() as IRequestSubjectType;
    }
    return serializeRequestSubjectType;
  }

  async getRequestSubjectTypeByFilters(
    filters: IRequestSubjectTypeFilters
  ): Promise<IPagingData<IRequestSubjectType | null>> {
    const query = RequestSubjectType.query();
    if (filters?.name) {
      query.whereILike("name", `%${filters.name}%`);
    }
    if (filters?.id) {
      query.where("id", filters.id);
    }
    if (filters?.requestObjectId) {
      query.where("requestObjectId", filters.requestObjectId);
    }
    if (filters?.programs) {
      query.whereHas("programs", (programsQuery) => {
        filters.programs?.forEach((program, index) => {
          if (index > 0) {
            programsQuery.orWhere("prg_codigo", program);
          } else {
            programsQuery.where("prg_codigo", program);
          }
        });
      });
    }
    const requestSubjectTypesPagination = await query
      .orderBy("order", "desc")
      .paginate(filters?.page ?? 1, filters?.perPage ?? 10);
    const { meta } = requestSubjectTypesPagination.serialize();
    let serializeRequestSubjectType = await this.formatRequestSubjectTypes(requestSubjectTypesPagination.all());

    return {
      array: serializeRequestSubjectType,
      meta,
    };
  }

  async updateRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<IRequestSubjectType | null> {
    const res = await RequestSubjectType.findOrFail(requestSubjectType?.id);
    res.name = requestSubjectType.name;
    res.requestObjectId = requestSubjectType.requestObjectId;
    await res.save();
    await res.load("programs");
    await RequestSubjectTypeProgram.query()
      .whereIn(
        "id",
        res.programs.map((program) => {
          return program.prg_codigo;
        })
      )
      .delete();
    if (requestSubjectType?.programs) {
      await RequestSubjectTypeProgram.createMany(
        requestSubjectType.programs.map((program) => {
          return {
            programId: program.prg_codigo,
            requestSubjectId: res.id,
          };
        })
      );
    }
    return await this.formatRequestSubjectType(res);
  }
}
