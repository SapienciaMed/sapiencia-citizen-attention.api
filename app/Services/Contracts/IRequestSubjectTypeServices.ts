import { IRequestObject, IRequestSubjectType, IRequestSubjectTypeFilters } from "App/Interfaces/RequestSubjectTypeInterfaces";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IRequestSubjectTypeServices {
  getRequestSubjectTypeById(id: number): Promise<ApiResponse<IRequestSubjectType | null>>;
  getRequestObjects(): Promise<ApiResponse<IRequestObject[]>>;
  getRequestSubjectTypeByFilters(filters: IRequestSubjectTypeFilters): Promise<ApiResponse<IPagingData<IRequestSubjectType | null>>>;
  createRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<ApiResponse<IRequestSubjectType | null>>;
  updateRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<ApiResponse<IRequestSubjectType | null>>;
}
