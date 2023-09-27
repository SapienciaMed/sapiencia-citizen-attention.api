import { IUser } from "App/Interfaces/UserInterfaces";
import { IWorkEntity, IWorkEntityFilters } from "App/Interfaces/WorkEntityInterfaces";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IWorkEntityServices {
  getUserByDocument(identification: string): Promise<ApiResponse<IUser | null>>;
  getWorkEntityById(id: number): Promise<ApiResponse<IWorkEntity | null>>;
  getWorkEntityByFilters(filters: IWorkEntityFilters): Promise<ApiResponse<IPagingData<IWorkEntity | null>>>;
  createWorkEntity(workEntity: IWorkEntity): Promise<ApiResponse<IWorkEntity | null>>;
  updateWorkEntity(workEntity: IWorkEntity): Promise<ApiResponse<IWorkEntity | null>>;
}
