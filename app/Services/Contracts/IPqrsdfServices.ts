import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import { IPqrsdf, IPqrsdfFilters, IpqrsdfByReques, IrequestPqrsdf, IrequestReopen } from "App/Interfaces/PqrsdfInterfaces";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";

export interface IPqrsdfServices {
  createPqrsdf(prsdf: IPqrsdf, file:MultipartFileContract,filedNumber:number): Promise<ApiResponse<IPqrsdf | null>>;
  getPrsdfById(id: number): Promise<ApiResponse<IPqrsdf | null>>;
  getPersonByDocument(identification: number): Promise<ApiResponse<IPerson | null>>;
  getPqrsdfPaginated(filters: IPqrsdfFilters): Promise<ApiResponse<IPagingData<IPqrsdf>>>
  getPeopleByFilters(filters: IPersonFilters): Promise<ApiResponse<IPagingData<IPerson | null>>>;
  updatePerson(person: IPerson): Promise<ApiResponse<IPerson | null>>;
  getPqrsdfByIdentificationAndFilingNumber(
    identification: number,
    filingNumber: number
  ): Promise<ApiResponse<IPqrsdf | null>>;
  uploadFile(file:MultipartFileContract): Promise<ApiResponse<boolean>>;
  getPqrsdfByRequest(filters:IrequestPqrsdf): Promise<ApiResponse<IpqrsdfByReques | null>>;
  createRequestReopen(justification:IrequestReopen): Promise<ApiResponse<IrequestReopen | null>>;
}
