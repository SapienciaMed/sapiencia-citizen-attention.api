import {
  IRequestObject,
  IRequestSubjectType,
  IRequestSubjectTypeFilters,
} from "App/Interfaces/RequestSubjectTypeInterfaces";
import AffairsProgram from "App/Models/AffairsProgram";
import AsoAsuntoSolicitud from "App/Models/AsoAsuntoSolicitud";
import ObsObjectoSolicitud from "App/Models/ObsObjectoSolicitud";
import { IPagingData } from "App/Utils/ApiResponses";
import { IRequestSubjectTypeRepository } from "./Contracts/IRequestSubjectTypeRepository";

export default class RequestSubjectTypeRepository implements IRequestSubjectTypeRepository {
  async createRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<IRequestSubjectType | null> {
    const res = await AsoAsuntoSolicitud.create({
      aso_asunto: requestSubjectType?.aso_asunto,
      requestObjectId: requestSubjectType?.requestObjectId,
    });
    if (requestSubjectType?.programs) {
      await AffairsProgram.createMany(
        requestSubjectType.programs.map((program) => {
          return {
            programId: program.prg_codigo,
            affairId: res.aso_codigo,
          };
        })
      );
    }
    return await this.formatRequestSubjectType(res);
  }

  async getRequestSubjectTypeByName(name: string, existsId?: number): Promise<IRequestSubjectType | null> {
    const existsInId = existsId ? [existsId] : [];
    const requestSubjectType = await AsoAsuntoSolicitud.query()
      .where("aso_asunto", name)
      .whereNotIn("aso_codigo", existsInId)
      .first();
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
    if (requestSubjectType?.requestObjectId) {
      res.requestObjectId = requestSubjectType.requestObjectId;
    }
    await res.save();
    await res.load("programs");
    await AffairsProgram.query()
      .where("affairId", res.aso_codigo)
      .whereIn(
        "programId",
        res.programs.map((program) => {
          return program.prg_codigo;
        })
      )
      .delete();
    if (requestSubjectType?.programs?.length) {
      await AffairsProgram.createMany(
        requestSubjectType.programs.map((program) => {
          return {
            programId: program.prg_codigo,
            affairId: res.aso_codigo,
          };
        })
      );
    }
    return await this.formatRequestSubjectType(res);
  }
}
