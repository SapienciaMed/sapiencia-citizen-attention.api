import { EGrouperCodes } from "App/Constants/GrouperCodesEnum";
import { IGenericData } from "App/Interfaces/GenericDataInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IGenericListsExternalService {
  getItemsByGrouper(grouper: EGrouperCodes, parentId?: number): Promise<ApiResponse<IGenericData[]>>;
}
