import { EGrouperCodes } from "App/Constants/GrouperCodesEnum";
import { IGenericData } from "App/Interfaces/GenericDataInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import { IGenericListsExternalService } from "./Contracts/IGenericListsExternalService";
import axios, { AxiosInstance } from "axios";

export default class GenericListsExternalService implements IGenericListsExternalService {
  private apiCore: AxiosInstance;

  constructor() {
    this.apiCore = axios.create({
      baseURL: process.env.APP_API_CORE,
    });
  }
  public async getItemsByGrouper(grouper: EGrouperCodes, parentId?: number): Promise<ApiResponse<IGenericData[]>> {
    const items = !parentId
      ? await this.apiCore.get<ApiResponse<IGenericData[]>>(`generic-list/get-by-grouper/${grouper}`)
      : await this.apiCore.get<ApiResponse<IGenericData[]>>(`generic-list/get-by-parent`, {
          params: {
            grouper: grouper,
            parentItemCode: parentId,
          },
        });

    return items.data;
  }
}
