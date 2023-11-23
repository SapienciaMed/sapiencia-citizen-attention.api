import { ApiResponse } from "App/Utils/ApiResponses";

export interface IRadicado {
    numberRadicado:number;
}

export interface IDocumentManagement {
  getNumberRadicado(): Promise<ApiResponse<IRadicado>>;
  putNumberRadicado(radicado: number):Promise<ApiResponse<IRadicado>>;
}