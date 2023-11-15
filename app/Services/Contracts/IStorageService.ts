import { ApiResponse } from "App/Utils/ApiResponses";
import { IFiles } from "App/Interfaces/EstorageInterface";

export interface IStorageService {
    getFiles(path?: string): Promise<ApiResponse<IFiles[]>>;
}