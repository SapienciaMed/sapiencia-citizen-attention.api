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
  public async getItemsByGrouper(grouper: EGrouperCodes): Promise<ApiResponse<IGenericData[]>> {
    const items = await this.apiCore.get<ApiResponse<IGenericData[]>>(`generic-list/get-by-grouper/${grouper}`);

    return items.data;
  }
}
