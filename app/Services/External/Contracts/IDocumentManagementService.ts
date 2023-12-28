import { ApiResponse } from "App/Utils/ApiResponses";

export interface IRadicado {
  numberRadicado: number;
}

export interface IDocumentManagement {
  getFilingNumber(code?: string): Promise<ApiResponse<IRadicado>>;
  putFilingNumber(filing: number): Promise<ApiResponse<IRadicado>>;
}
