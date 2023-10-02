import { IUser, IUserFilters } from "App/Interfaces/UserInterfaces";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import axios, { AxiosInstance } from "axios";
import { IAuthExternalService } from "./Contracts/IAuthExternalService";
import Env from "@ioc:Adonis/Core/Env";

export default class AuthExternalService implements IAuthExternalService {
  private apiAuth: AxiosInstance;

  constructor() {
    this.apiAuth = axios.create({
      baseURL: process.env.APP_API_AUTH,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
  public async getUserByDocument(identification: string): Promise<ApiResponse<IUser | null>> {
    const items = await this.apiAuth.get<ApiResponse<IUser | null>>(`user/get-by-document/${identification}`, {
      headers: {
        permissions: Env.get("CURRENT_PERMISSIONS"),
        Authorization: Env.get("CURRENT_AUTHORIZATION"),
      },
    });

    return items.data;
  }

  public async getUserById(id: number): Promise<ApiResponse<IUser | null>> {
    const items = await this.apiAuth.get<ApiResponse<IUser | null>>(`user/get-by-id/${id}`, {
      headers: {
        permissions: Env.get("CURRENT_PERMISSIONS"),
        Authorization: Env.get("CURRENT_AUTHORIZATION"),
      },
    });

    return items.data;
  }

  public async searchUser(filter: IUserFilters): Promise<ApiResponse<IPagingData<IUser | null>>> {
    const items = await this.apiAuth.post<ApiResponse<IPagingData<IUser | null>>>(`user/search`, filter, {
      headers: {
        permissions: Env.get("CURRENT_PERMISSIONS"),
        Authorization: Env.get("CURRENT_AUTHORIZATION"),
      },
    });

    return items.data;
  }
}
