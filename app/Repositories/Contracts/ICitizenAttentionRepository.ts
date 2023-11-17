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
import { IPagingData } from "App/Utils/ApiResponses";

export interface ICitizenAttentionRepository {
  getPrograms(): Promise<IProgram[]>; //Programs
  getValueGroups(): Promise<IValueGroup[]>; //Grupos de valor
  getDependencies(): Promise<IDependence[]>; //Dependencias
  getCorregimientos(): Promise<ICorregimiento[]>; //Corregimientos y comunas
  getSeviceChannels(): Promise<IServiceChannel[]>; //Canales de atención
  getRequestSubjectTypes(): Promise<IRequestSubjectType[]>; //Temas de solicitud
  getAttentionRequestTypes(): Promise<IAttentionRequestType[]>; //Tipo de solicitud
  getCitizenAttentionById(id: number): Promise<ICitizenAttention | null>;
  createCitizenAttention(citizenAttention: ICitizenAttention): Promise<ICitizenAttention | null>;
  updateCitizenAttention(citizenAttention: ICitizenAttention): Promise<ICitizenAttention | null>;
  getCitizenAttentionByFilters(filters: ICitizenAttentionFilters): Promise<IPagingData<ICitizenAttention | null>>;
}
