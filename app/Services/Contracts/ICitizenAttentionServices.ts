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
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface ICitizenAttentionServices {
  getPrograms(): Promise<ApiResponse<IProgram[]>>; //Programs
  getValueGroups(): Promise<ApiResponse<IValueGroup[]>>; //Grupos de valor
  getDependencies(): Promise<ApiResponse<IDependence[]>>; //Dependencias
  getCorregimientos(): Promise<ApiResponse<ICorregimiento[]>>; //Corregimientos y comunas
  getSeviceChannels(): Promise<ApiResponse<IServiceChannel[]>>; //Canales de atención
  getRequestSubjectTypes(): Promise<ApiResponse<IRequestSubjectType[]>>; //Temas de solicitud
  getAttentionRequestTypes(): Promise<ApiResponse<IAttentionRequestType[]>>; //Tipo de solicitud
  getCitizenAttentionById(id: number): Promise<ApiResponse<ICitizenAttention | null>>;
  createCitizenAttention(citizenAttention: ICitizenAttention): Promise<ApiResponse<ICitizenAttention | null>>;
  updateCitizenAttention(citizenAttention: ICitizenAttention): Promise<ApiResponse<ICitizenAttention | null>>;
  getCitizenAttentionByFilters(
    filters: ICitizenAttentionFilters
  ): Promise<ApiResponse<IPagingData<ICitizenAttention | null>>>;
}
