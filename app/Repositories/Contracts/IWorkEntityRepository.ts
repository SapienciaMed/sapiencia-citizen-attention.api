import { IUser } from "App/Interfaces/UserInterfaces";
import { IWorkEntity, IWorkEntityFilters } from "App/Interfaces/WorkEntityInterfaces";
import { IWorkEntityType } from "App/Interfaces/WorkEntityTypeInterface";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IWorkEntityRepository {
  getUserByDocument(identification: string): Promise<IUser | null>;
  getWorkEntityById(id: number): Promise<IWorkEntity | null>;
  getWorkEntityTypes(): Promise<IWorkEntityType[]>;
  getWorkEntityByUserId(id: number): Promise<IWorkEntity | null>;
  getWorkEntityByFilters(filters: IWorkEntityFilters): Promise<IPagingData<IWorkEntity | null>>;
  createWorkEntity(workEntity: IWorkEntity): Promise<IWorkEntity | null>;
  updateWorkEntity(workEntity: IWorkEntity): Promise<IWorkEntity | null>;
}
