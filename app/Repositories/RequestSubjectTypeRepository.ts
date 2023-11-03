import {
  IRequestObject,
  IRequestSubjectType,
  IRequestSubjectTypeFilters,
} from "App/Interfaces/RequestSubjectTypeInterfaces";
import ObsObjectoSolicitud from "App/Models/ObsObjectoSolicitud";
import AsoAsuntoSolicitud from "App/Models/AsoAsuntoSolicitud";
import RequestSubjectTypeProgram from "App/Models/RequestSubjectTypeProgram";
import { IPagingData } from "App/Utils/ApiResponses";
import { IRequestSubjectTypeRepository } from "./Contracts/IRequestSubjectTypeRepository";

export default class RequestSubjectTypeRepository implements IRequestSubjectTypeRepository {
  async createRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<IRequestSubjectType | null> {
    const res = await AsoAsuntoSolicitud.create({
      aso_asunto: requestSubjectType?.aso_asunto,
      requestObjectId: requestSubjectType?.requestObjectId,
    });
    if (requestSubjectType?.programs) {
      await RequestSubjectTypeProgram.createMany(
        requestSubjectType.programs.map((program) => {
          return {
            programId: program.prg_codigo,
            requestSubjectId: res.aso_codigo,
          };
        })
      );
    }
    return await this.formatRequestSubjectType(res);
  }

  async getRequestSubjectTypeByName(name: string): Promise<IRequestSubjectType | null> {
    const requestSubjectType = await AsoAsuntoSolicitud.query().where("aso_asunto", name).first();
    return requestSubjectType as IRequestSubjectType;
  }

  async getRequestSubjectTypeById(id: number): Promise<IRequestSubjectType | null> {
    const requestSubjectType = await AsoAsuntoSolicitud.find(id);
    return await this.formatRequestSubjectType(requestSubjectType);
  }

  async getRequestObjects(): Promise<IRequestObject[]> {
    const res = await ObsObjectoSolicitud.query().orderBy("obs_orden");
    return res.map((requestObject) => requestObject.serialize() as IRequestObject);
  }

  private async formatRequestSubjectTypes(requestSubjectTypes: AsoAsuntoSolicitud[]): Promise<IRequestSubjectType[]> {
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
    requestSubjectType: AsoAsuntoSolicitud | null
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
    const query = AsoAsuntoSolicitud.query();
    if (filters?.aso_asunto) {
      query.whereILike("aso_asunto", `%${filters.aso_asunto}%`);
    }
    if (filters?.aso_codigo) {
      query.where("aso_codigo", filters.aso_codigo);
    }
    if (filters?.requestObjectId) {
      query.where("requestObjectId", filters.requestObjectId);
    }
    if (filters?.programId) {
      query.whereHas("programs", (programQuery) => {
        programQuery.where("prg_codigo", String(filters.programId));
      });
    }
    const requestSubjectTypesPagination = await query
      .orderBy("aso_codigo", "desc")
      .paginate(filters?.page ?? 1, filters?.perPage ?? 10);
    const { meta } = requestSubjectTypesPagination.serialize();
    let serializeRequestSubjectType = await this.formatRequestSubjectTypes(requestSubjectTypesPagination.all());

    return {
      array: serializeRequestSubjectType,
      meta,
    };
  }

  async updateRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<IRequestSubjectType | null> {
    const res = await AsoAsuntoSolicitud.findOrFail(requestSubjectType?.aso_codigo);
    res.aso_asunto = requestSubjectType.aso_asunto;
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
            requestSubjectId: res.aso_codigo,
          };
        })
      );
    }
    return await this.formatRequestSubjectType(res);
  }
}
