import { IProgram } from "App/Interfaces/ProgramInterfaces";
import { IUser } from "App/Interfaces/UserInterfaces";
import { IWorkEntity, IWorkEntityFilters } from "App/Interfaces/WorkEntityInterfaces";
import { IWorkEntityType } from "App/Interfaces/WorkEntityTypeInterface";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IWorkEntityRepository {
  getUserByDocument(identification: string): Promise<IUser | null>;
  getUserByFilters(
    filters: IWorkEntityFilters,
    all: boolean
  ): Promise<{
    filterUser: boolean;
    user: IUser | (IUser | null)[] | null;
  }>;
  getWorkEntityById(id: number): Promise<IWorkEntity | null>;
  getWorkEntityTypes(): Promise<IWorkEntityType[]>;
  getWorkEntityByUserId(id: number): Promise<IWorkEntity | null>;
  getProgramsAffairs(): Promise<IProgram[]>;
  getWorkEntityByFilters(filters: IWorkEntityFilters): Promise<IPagingData<IWorkEntity | null>>;
  createWorkEntity(workEntity: IWorkEntity): Promise<IWorkEntity | null>;
  updateWorkEntity(workEntity: IWorkEntity): Promise<IWorkEntity | null>;
}
