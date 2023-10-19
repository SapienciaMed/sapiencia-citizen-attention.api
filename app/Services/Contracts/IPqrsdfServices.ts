import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import { IPqrsdf } from "App/Interfaces/PqrsdfInterfaces";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IPqrsdfServices {
  createPqrsdf(prsdf: IPqrsdf): Promise<ApiResponse<IPqrsdf | null>>;
  getPrsdfById(id: number): Promise<ApiResponse<IPqrsdf | null>>;
  getPersonByDocument(identification: number): Promise<ApiResponse<IPerson | null>>;
  getPeopleByFilters(filters: IPersonFilters): Promise<ApiResponse<IPagingData<IPerson | null>>>;
  updatePerson(person: IPerson): Promise<ApiResponse<IPerson | null>>;
  getPqrsdfByIdentificationAndFilingNumber(
    identification: number,
    filingNumber: number
  ): Promise<ApiResponse<IPqrsdf | null>>;
  uploadFile(file:MultipartFileContract): Promise<ApiResponse<MultipartFileContract | null>>;
}
