import {
  IAttentionRequestType,
  ICitizenAttention,
  ICitizenAttentionFilters,
  ICorregimiento,
  IServiceChannel,
  IValueGroup,
} from "App/Interfaces/CitizenAttentionInterfaces";
import { IDependence } from "App/Interfaces/DependenceInterfaces";
import { IGenericData } from "App/Interfaces/GenericDataInterfaces";
import { ILegalEntityType } from "App/Interfaces/LegalEntityTypeInterfaces";
import { IProgram } from "App/Interfaces/ProgramInterfaces";
import { IRequestSubjectType } from "App/Interfaces/RequestSubjectTypeInterfaces";
import { IRequestType } from "App/Interfaces/RequestTypeInterfaces";
import { IResponseMedium } from "App/Interfaces/ResponseMediumInterfaces";
import { IResponseType } from "App/Interfaces/ResponseTypeInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";

export interface ICitizenAttentionRepository {
  getPrograms(): Promise<IProgram[]>; //Programs
  getStratums(): Promise<IGenericData[]>; //Estratos
  getCountries(): Promise<IGenericData[]>; //Paises
  getValueGroups(): Promise<IValueGroup[]>; //Grupos de valor
  getDependencies(): Promise<IDependence[]>; //Dependencias
  getRequestTypes(): Promise<IRequestType[]>; //tipo de solicitud
  getResponseTypes(): Promise<IResponseType[]>; //tipo de repuesta
  getCorregimientos(): Promise<ICorregimiento[]>; //Corregimientos y comunas
  getSeviceChannels(): Promise<IServiceChannel[]>; //Canales de atención
  getResponseMediums(): Promise<IResponseMedium[]>; //Medios de respuesta
  getLegalEntityTypes(): Promise<ILegalEntityType[]>; //tipo de entidad juridica
  getRequestSubjectTypes(): Promise<IRequestSubjectType[]>; //Temas de solicitud
  getDepartments(countryId?: number): Promise<IGenericData[]>; //Departamentos
  getAttentionRequestTypes(): Promise<IAttentionRequestType[]>; //Tipo de solicitud de atención
  getMunicipalities(departmentId?: number): Promise<IGenericData[]>; //Municipios
  getCitizenAttentionById(id: number): Promise<ICitizenAttention | null>;
  createCitizenAttention(citizenAttention: ICitizenAttention): Promise<ICitizenAttention | null>;
  updateCitizenAttention(citizenAttention: ICitizenAttention): Promise<ICitizenAttention | null>;
  getCitizenAttentionByFilters(filters: ICitizenAttentionFilters): Promise<IPagingData<ICitizenAttention | null>>;
  getProgramByUser(payload: any): Promise<any>
  getSubjectByUser(payload: any): Promise<any>
}
