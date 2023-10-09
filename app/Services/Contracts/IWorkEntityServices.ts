import { IProgram } from "App/Interfaces/ProgramInterfaces";
import { IUser } from "App/Interfaces/UserInterfaces";
import { IWorkEntity, IWorkEntityFilters } from "App/Interfaces/WorkEntityInterfaces";
import { IWorkEntityType } from "App/Interfaces/WorkEntityTypeInterface";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IWorkEntityServices {
  getUserByDocument(identification: string): Promise<ApiResponse<IUser | null>>;
  getUserByFilters(filters: IWorkEntityFilters): Promise<ApiResponse<IUser | null>>;
  getWorkEntityTypes(): Promise<ApiResponse<IWorkEntityType[]>>;
  getProgramsAffairs(): Promise<ApiResponse<IProgram[]>>
  getWorkEntityById(id: number): Promise<ApiResponse<IWorkEntity | null>>;
  getWorkEntityByFilters(filters: IWorkEntityFilters): Promise<ApiResponse<IPagingData<IWorkEntity | null>>>;
  createWorkEntity(workEntity: IWorkEntity): Promise<ApiResponse<IWorkEntity | null>>;
  updateWorkEntity(workEntity: IWorkEntity): Promise<ApiResponse<IWorkEntity | null>>;
}
