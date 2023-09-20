import { IPqrsdf } from "App/Interfaces/PqrsdfInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IPqrsdfServices {
  getPrsdfById(id: number): Promise<ApiResponse<IPqrsdf | null>>;
  getPqrsdfByIdentificationAndFilingNumber(
    identification: number,
    filingNumber: number
  ): Promise<ApiResponse<IPqrsdf | null>>;
}
