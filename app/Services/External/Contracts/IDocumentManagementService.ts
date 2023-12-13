import { ApiResponse } from "App/Utils/ApiResponses";

export interface IRadicado {
    numberRadicado:number;
}

export interface IDocumentManagement {
  getFilingNumber(): Promise<ApiResponse<IRadicado>>;
  putFilingNumber(radicado: number):Promise<ApiResponse<IRadicado>>;
}
