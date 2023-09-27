import { IUser, IUserFilters } from "App/Interfaces/UserInterfaces";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import axios, { AxiosInstance } from "axios";
import { IAuthExternalService } from "./Contracts/IAuthExternalService";

export default class AuthExternalService implements IAuthExternalService {
  private apiAuth: AxiosInstance;

  constructor() {
    this.apiAuth = axios.create({
      baseURL: process.env.APP_API_AUTH,
    });
  }
  public async getUserByDocument(identification: string): Promise<ApiResponse<IUser|null>> {
    const items = await this.apiAuth.get<ApiResponse<IUser|null>>(`user/get-by-document/${identification}`);

    return items.data;
  }

  public async  getUserById(id: number): Promise<ApiResponse<IUser|null>> {
    const items = await this.apiAuth.get<ApiResponse<IUser|null>>(`user/get-by-id/${id}`);

    return items.data;
  }

  public async  searchUser(
    filter: IUserFilters
  ): Promise<ApiResponse<IPagingData<IUser|null>>> {
    const items = await this.apiAuth.post<ApiResponse<IPagingData<IUser|null>>>(`user/search`,filter);

    return items.data;
  }
}
