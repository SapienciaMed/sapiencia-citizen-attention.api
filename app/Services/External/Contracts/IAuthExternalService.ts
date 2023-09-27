import { IUser, IUserFilters } from "App/Interfaces/UserInterfaces";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IAuthExternalService {
  getUserById(id: number): Promise<ApiResponse<IUser | null>>;
  getUserByDocument(identification: string): Promise<ApiResponse<IUser | null>>;
  searchUser(filter: IUserFilters): Promise<ApiResponse<IPagingData<IUser | null>>>;
}
