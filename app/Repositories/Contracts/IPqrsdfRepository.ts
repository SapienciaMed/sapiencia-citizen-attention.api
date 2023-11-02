import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import { IPqrsdf, IPqrsdfFilters, IpqrsdfByReques, IrequestPqrsdf, IrequestReopen } from "App/Interfaces/PqrsdfInterfaces";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import { IPagingData } from "App/Utils/ApiResponses";

export interface IPqrsdfRepository {
  getPqrsdfById(id: number): Promise<IPqrsdf | null>;
  getPqrsdfByIdentificationAndFilingNumber(identification: number, filingNumber: number): Promise<IPqrsdf | null>;
  getPeopleByFilters(filters: IPersonFilters): Promise<IPagingData<IPerson | null>>;
  getPqrsdfs(): Promise<IPqrsdf[] | []>;
  getPersonByDocument(identification: number): Promise<IPerson | null>;
  getPqrsdfPaginated(filters: IPqrsdfFilters ):  Promise<IPagingData<IPqrsdf>>
  updatePerson(person: IPerson): Promise<IPerson | null>;
  createPqrsdf(prsdf: IPqrsdf): Promise<IPqrsdf | null>;
  updatePqrsdf(prsdf: IPqrsdf): Promise<IPqrsdf | null>;
  uploadFile(file:MultipartFileContract): Promise<boolean>;
  getPqrsdfByRequest(filters:IrequestPqrsdf): Promise<IpqrsdfByReques | null>;
  createRequestReopen(justification:IrequestReopen): Promise<IrequestReopen | null>;
}
