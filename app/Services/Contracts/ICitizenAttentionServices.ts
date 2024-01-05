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
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface ICitizenAttentionServices {
  getPrograms(): Promise<ApiResponse<IProgram[]>>; //Programas
  getStratums(): Promise<ApiResponse<IGenericData[]>>; //Estratos
  getCountries(): Promise<ApiResponse<IGenericData[]>>; //Paises
  getValueGroups(): Promise<ApiResponse<IValueGroup[]>>; //Grupos de valor
  getDependencies(): Promise<ApiResponse<IDependence[]>>; //Dependencias
  getRequestTypes(): Promise<ApiResponse<IRequestType[]>>; //Tipo de solicitud
  getResponseTypes(): Promise<ApiResponse<IResponseType[]>>; //tipo de repuesta
  getCorregimientos(): Promise<ApiResponse<ICorregimiento[]>>; //Corregimientos y comunas
  getSeviceChannels(): Promise<ApiResponse<IServiceChannel[]>>; //Canales de atención
  getResponseMediums(): Promise<ApiResponse<IResponseMedium[]>>; //Medios de respuesta
  getLegalEntityTypes(): Promise<ApiResponse<ILegalEntityType[]>>; //tipo de entidad juridica
  getRequestSubjectTypes(): Promise<ApiResponse<IRequestSubjectType[]>>; //Temas de solicitud
  getDepartments(countryId?: number): Promise<ApiResponse<IGenericData[]>>; //Departamentos
  getAttentionRequestTypes(): Promise<ApiResponse<IAttentionRequestType[]>>; //Tipo de solicitud de atención
  getMunicipalities(departmentId?: number): Promise<ApiResponse<IGenericData[]>>; //Municipios
  getCitizenAttentionById(id: number): Promise<ApiResponse<ICitizenAttention | null>>;
  createCitizenAttention(citizenAttention: ICitizenAttention): Promise<ApiResponse<ICitizenAttention | null>>;
  updateCitizenAttention(citizenAttention: ICitizenAttention): Promise<ApiResponse<ICitizenAttention | null>>;
  getCitizenAttentionByFilters(
    filters: ICitizenAttentionFilters
  ): Promise<ApiResponse<IPagingData<ICitizenAttention | null>>>;
  getProgramByUser(payload: any)
  getRequestTypesByUser(payload: any)
}
