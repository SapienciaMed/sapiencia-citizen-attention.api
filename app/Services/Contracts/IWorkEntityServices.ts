import { IProgram } from "App/Interfaces/ProgramInterfaces";
import { IUser } from "App/Interfaces/UserInterfaces";
import { IWorkEntity, IWorkEntityFilters } from "App/Interfaces/WorkEntityInterfaces";
import { IWorkEntityType } from "App/Interfaces/WorkEntityTypeInterface";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IWorkEntityServices {
  getProgramsAffairs(): Promise<ApiResponse<IProgram[]>>;
  getWorkEntityByFilters(
    filters: IWorkEntityFilters,
    all?: boolean
  ): Promise<ApiResponse<IPagingData<IWorkEntity | null>>>;
  getWorkEntityTypes(): Promise<ApiResponse<IWorkEntityType[]>>;
  getWorkEntityById(id: number): Promise<ApiResponse<IWorkEntity | null>>;
  getWorkEntityByUserId(id: number): Promise<ApiResponse<IWorkEntity | null>>;
  getUserByDocument(identification: string): Promise<ApiResponse<IUser | null>>;
  createWorkEntity(workEntity: IWorkEntity): Promise<ApiResponse<IWorkEntity | null>>;
  updateWorkEntity(workEntity: IWorkEntity): Promise<ApiResponse<IWorkEntity | null>>;
  getEntityManagersByEntityTypeId(id: number): Promise<ApiResponse<IWorkEntity | null>>;
  getUserByFilters(filters: IWorkEntityFilters): Promise<ApiResponse<IUser | (IUser | null)[] | null>>;
}
