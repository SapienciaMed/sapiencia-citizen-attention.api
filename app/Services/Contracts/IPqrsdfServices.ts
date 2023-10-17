import { IPerson } from "App/Interfaces/PersonInterfaces";
import { IPqrsdf } from "App/Interfaces/PqrsdfInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IPqrsdfServices {
  createPqrsdf(prsdf: IPqrsdf): Promise<ApiResponse<IPqrsdf | null>>;
  getPrsdfById(id: number): Promise<ApiResponse<IPqrsdf | null>>;
  getPersonByDocument(identification: number): Promise<ApiResponse<IPerson | null>>;
  getPqrsdfByIdentificationAndFilingNumber(
    identification: number,
    filingNumber: number
  ): Promise<ApiResponse<IPqrsdf | null>>;
}
