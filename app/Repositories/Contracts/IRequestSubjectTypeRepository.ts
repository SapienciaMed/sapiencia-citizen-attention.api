import {
  IRequestObject,
  IRequestSubjectType,
  IRequestSubjectTypeFilters,
} from "App/Interfaces/RequestSubjectTypeInterfaces";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IRequestSubjectTypeRepository {
  getRequestSubjectTypeById(id: number): Promise<IRequestSubjectType | null>;
  getRequestSubjectTypeByName(name: string): Promise<IRequestSubjectType | null>;
  getRequestObjects(): Promise<IRequestObject[]>;
  getRequestSubjectTypeByFilters(filters: IRequestSubjectTypeFilters): Promise<IPagingData<IRequestSubjectType | null>>;
  createRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<IRequestSubjectType | null>;
  updateRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<IRequestSubjectType | null>;
}
