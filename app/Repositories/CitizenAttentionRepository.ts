import {
  IAttentionRequestType,
  ICitizenAttention,
  ICitizenAttentionFilters,
  ICorregimiento,
  IServiceChannel,
  IValueGroup,
} from "App/Interfaces/CitizenAttentionInterfaces";
import { IDependence } from "App/Interfaces/DependenceInterfaces";
import { IProgram } from "App/Interfaces/ProgramInterfaces";
import { IRequestSubjectType } from "App/Interfaces/RequestSubjectTypeInterfaces";
import AsoAsuntoSolicitud from "App/Models/AsoAsuntoSolicitud";
import AttentionRequestType from "App/Models/AttentionRequestType";
import CitizenAttention from "App/Models/CitizenAttention";
import CnaCanalesAtencion from "App/Models/CnaCanalesAtencion";
import Corregimiento from "App/Models/Corregimiento";
import DepDependencia from "App/Models/DepDependencia";
import PrgPrograma from "App/Models/PrgPrograma";
import ValueGroup from "App/Models/ValueGroup";
import { IPagingData } from "App/Utils/ApiResponses";
import { ICitizenAttentionRepository } from "./Contracts/ICitizenAttentionRepository";
import { IGenericListsExternalService } from "App/Services/External/Contracts/IGenericListsExternalService";
import { EGrouperCodes } from "App/Constants/GrouperCodesEnum";
import { IGenericData } from "App/Interfaces/GenericDataInterfaces";
import { IRequestType } from "App/Interfaces/RequestTypeInterfaces";
import TsoTipoSolicitud from "App/Models/TsoTipoSolicitud";
import { ILegalEntityType } from "App/Interfaces/LegalEntityTypeInterfaces";
import TejTipoEntidadJuridica from "App/Models/TejTipoEntidadJuridica";
import { IResponseMedium } from "App/Interfaces/ResponseMediumInterfaces";
import MreMedioRespuesta from "App/Models/MreMedioRespuesta";
import { IResponseType } from "App/Interfaces/ResponseTypeInterfaces";
import ResponseType from "App/Models/ResponseType";
import Database from "@ioc:Adonis/Lucid/Database";
import { DateTime } from "luxon";

export default class CitizenAttentionRepository implements ICitizenAttentionRepository {
  constructor(private GenericListsExternalService: IGenericListsExternalService) {}

  async createCitizenAttention(citizenAttention: ICitizenAttention): Promise<ICitizenAttention | null> {
    if (!citizenAttention?.detailServiceChannelId) {
      delete citizenAttention.detailServiceChannelId;
    }
    const res = await CitizenAttention.create(citizenAttention);
    return await this.formatCitizenAttention(res);
  }

  async getCitizenAttentionById(id: number): Promise<ICitizenAttention | null> {
    const citizenAttention = await CitizenAttention.find(id);
    return await this.formatCitizenAttention(citizenAttention);
  }

  async getAttentionRequestTypes(): Promise<IAttentionRequestType[]> {
    const res = await AttentionRequestType.query().orderBy("order");
    return res.map((model) => model.serialize() as IAttentionRequestType);
  }

  async getStratums(): Promise<IGenericData[]> {
    const res = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.STRATUM);
    return res.data;
  }

  async getCountries(): Promise<IGenericData[]> {
    const res = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.COUNTRIES);
    return res.data;
  }

  async getDepartments(countryId?: number): Promise<IGenericData[]> {
    const res = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.DEPARTMENTS, countryId);
    return res.data;
  }

  async getMunicipalities(departmentId?: number): Promise<IGenericData[]> {
    const res = await this.GenericListsExternalService.getItemsByGrouper(EGrouperCodes.MUNICIPALITIES, departmentId);
    return res.data;
  }

  async getResponseMediums(): Promise<IResponseMedium[]> {
    const res = await MreMedioRespuesta.query().orderBy("mre_orden");
    return res.map((model) => model.serialize() as IResponseMedium);
  }

  async getCorregimientos(): Promise<ICorregimiento[]> {
    const res = await Corregimiento.query().orderBy("order");
    return res.map((model) => model.serialize() as ICorregimiento);
  }

  async getResponseTypes(): Promise<IResponseType[]> {
    const res = await ResponseType.query().where("isActive", true).orderBy("order");
    return res.map((model) => model.serialize() as IResponseType);
  }

  async getDependencies(): Promise<IDependence[]> {
    const res = await DepDependencia.query()
      .preload("programs", (program) => {
        program.preload("affairs");
      })
      .orderBy("dep_orden");
    return res.map((model) => model.serialize() as IDependence);
  }

  async getPrograms(): Promise<IProgram[]> {
    const res = await PrgPrograma.query()
      .preload("clpClasificacionPrograma")
      .preload("depDependencia")
      .preload("affairs", (affair) => {
        affair.preload("motives");
      })
      .orderBy("prg_orden");
    return res.map((model) => model.serialize() as IProgram);
  }

  async getRequestTypes(): Promise<IRequestType[]> {
    const res = await TsoTipoSolicitud.query().orderBy("tso_orden");
    return res.map((model) => model.serialize() as IRequestType);
  }

  async getLegalEntityTypes(): Promise<ILegalEntityType[]> {
    const res = await TejTipoEntidadJuridica.query().orderBy("tej_orden");
    return res.map((model) => model.serialize() as ILegalEntityType);
  }

  async getRequestSubjectTypes(): Promise<IRequestSubjectType[]> {
    const res = await AsoAsuntoSolicitud.query().preload("motives").orderBy("aso_orden");
    return res.map((model) => model.serialize() as IRequestSubjectType);
  }

  async getSeviceChannels(): Promise<IServiceChannel[]> {
    const res = await CnaCanalesAtencion.query().preload("details").orderBy("cna_orden");
    return res.map((model) => model.serialize() as IServiceChannel);
  }

  async getValueGroups(): Promise<IValueGroup[]> {
    const res = await ValueGroup.query().preload("userTypes").orderBy("order");
    return res.map((model) => model.serialize() as IValueGroup);
  }

  private async formatCitizenAttentions(citizenAttentions: CitizenAttention[]): Promise<ICitizenAttention[]> {
    let citizenAttentionsFormatted: ICitizenAttention[] = [];
    for await (const citizenAttention of citizenAttentions) {
      let citizenAttentionFormatted = await this.formatCitizenAttention(citizenAttention);
      if (citizenAttentionFormatted) {
        citizenAttentionsFormatted.push(citizenAttentionFormatted);
      }
    }
    return citizenAttentionsFormatted;
  }

  private async formatCitizenAttention(citizenAttention: CitizenAttention | null): Promise<ICitizenAttention | null> {
    let serializeCitizenAttention: any;
    if (citizenAttention) {
      await citizenAttention.load("program");
      if (citizenAttention.userTypeId) {
        await citizenAttention.load("userType", (userType) => {
          userType.preload("valueGroup");
        });
      }
      await citizenAttention.load("dependency");
      if (citizenAttention.corregimientoId) {
        await citizenAttention.load("corregimiento");
      }
      await citizenAttention.load("requestSubjectType");
      await citizenAttention.load("attentionRequestType");
      await citizenAttention.load("serviceChannel");
      if (citizenAttention.detailServiceChannelId) {
        await citizenAttention.load("detailServiceChannel");
      }

      serializeCitizenAttention = citizenAttention.serialize() as ICitizenAttention;
    }
    return serializeCitizenAttention;
  }

  async getCitizenAttentionByFilters(
    filters: ICitizenAttentionFilters
  ): Promise<IPagingData<ICitizenAttention | null>> {
    const query = CitizenAttention.query();
    if (filters?.businessName) {
      query.whereILike("businessName", `%${filters.businessName}%`);
    }
    if (filters?.userId) {
      query.where("userId", filters.userId);
    }
    if (filters?.email) {
      query.whereILike("businessName", `%${filters.email}%`);
    }
    if (filters?.attentionRequestTypeId) {
      query.where("attentionRequestTypeId", filters.attentionRequestTypeId);
    }
    if (filters?.corregimientoId) {
      query.where("corregimientoId", filters.corregimientoId);
    }
    if (filters?.dependencyId) {
      query.where("dependencyId", filters.dependencyId);
    }
    if (filters?.detailServiceChannelId) {
      query.where("detailServiceChannelId", filters.detailServiceChannelId);
    }
    if (filters?.documentTypeId) {
      query.where("documentTypeId", filters.documentTypeId);
    }
    if (filters?.firstContactNumber) {
      query.whereILike("firstContactNumber", `%${filters.firstContactNumber}%`);
    }
    if (filters?.secondContactNumber) {
      query.whereILike("secondContactNumber", `%${filters.secondContactNumber}%`);
    }
    if (filters?.firstName) {
      query.whereILike("firstName", `%${filters.firstName}%`);
    }
    if (filters?.secondName) {
      query.whereILike("secondName", `%${filters.secondName}%`);
    }
    if (filters?.firstSurname) {
      query.whereILike("firstSurname", `%${filters.firstSurname}%`);
    }
    if (filters?.secondSurname) {
      query.whereILike("secondSurname", `%${filters.secondSurname}%`);
    }
    if (filters?.identification) {
      query.whereILike("identification", `%${filters.identification}%`);
    }
    if (filters?.observation) {
      query.whereILike("observation", `%${filters.observation}%`);
    }
    if (filters?.programId) {
      query.where("programId", filters.programId);
    }
    if (filters?.id) {
      query.where("id", filters.id);
    }
    if (filters?.requestSubjectTypeId) {
      query.where("requestSubjectTypeId", filters.requestSubjectTypeId);
    }
    if (filters?.userTypeId) {
      query.where("userTypeId", filters.userTypeId);
    }

    if (filters.createdAt) {
      const date = DateTime.fromISO(String(filters.createdAt));
      const startDate = date.startOf("day").toFormat("yyyy-MM-dd HH:mm:ss");
      const endDate = date.endOf("day").toFormat("yyyy-MM-dd HH:mm:ss");
      query.whereBetween("createdAt", [startDate, endDate]);
    }

    const citizenAttentionsPagination = await query.paginate(filters?.page ?? 1, filters?.perPage ?? 10);
    const { meta } = citizenAttentionsPagination.serialize();
    let serializeCitizenAttention = await this.formatCitizenAttentions(citizenAttentionsPagination.all());

    return {
      array: serializeCitizenAttention,
      meta,
    };
  }

  async updateCitizenAttention(citizenAttention: ICitizenAttention): Promise<ICitizenAttention | null> {
    const res = await CitizenAttention.findOrFail(citizenAttention?.id);
    delete citizenAttention.detailServiceChannel;
    delete citizenAttention.attentionRequestType;
    delete citizenAttention.dependency;
    delete citizenAttention.program;
    delete citizenAttention.requestSubjectType;
    delete citizenAttention.corregimiento;
    delete citizenAttention.userType;
    delete citizenAttention.createdAt;
    delete citizenAttention.updatedAt;
    res.fill(citizenAttention);
    await res.save();
    return await this.formatCitizenAttention(res);
  }

  async getProgramByUser(payload): Promise<any> {
    const { identification } = payload;
    const query = `SELECT DISTINCT(pp.PRG_CODIGO) AS value, pp.PRG_DESCRIPCION as name
    FROM PRG_PROGRAMAS pp
    INNER JOIN ACI_ATENCION_CIUDADANA aac ON aac.ACI_CODPRG_PROGRAMA = pp.PRG_CODIGO
    INNER JOIN PER_PERSONAS PER ON PER.PER_NUMERO_DOCUMENTO = aac.ACI_NUMERO_DOCUMENTO
    WHERE PER.PER_NUMERO_DOCUMENTO = "${identification}"`;

    const result = await Database.rawQuery(query);

    const data = result[0];

    return data;
  }

  async getRequestTypesByUser(payload): Promise<any> {
    const { identification } = payload;
    const query = `SELECT DISTINCT(ASO.ASO_CODIGO) AS value, ASO.ASO_ASUNTO AS name
    FROM ASO_ASUNTO_SOLICITUD ASO
    INNER JOIN ACI_ATENCION_CIUDADANA aac ON aac.ACI_CODASO_ASUNTO  = ASO.ASO_CODIGO
    INNER JOIN PER_PERSONAS PER ON PER.PER_NUMERO_DOCUMENTO = aac.ACI_NUMERO_DOCUMENTO
    WHERE PER.PER_NUMERO_DOCUMENTO = "${identification}" AND ASO.ASO_ACTIVO=1`;

    const result = await Database.rawQuery(query);

    const data = result[0];

    return data;
  }
}
