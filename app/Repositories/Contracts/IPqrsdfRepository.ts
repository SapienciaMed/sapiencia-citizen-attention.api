import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import {
  IPqrsdf,
  IPqrsdfFilters,
  IpqrsdfByRequest,
  IrequestPqrsdf,
  IReopenRequest,
} from "App/Interfaces/PqrsdfInterfaces";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IPqrsdfRepository {
  getPqrsdfById(id: number): Promise<IPqrsdf | null>;
  getPqrsdfByIdentificationAndFilingNumber(identification: number, filingNumber: number): Promise<IPqrsdf | null>;
  getPeopleByFilters(filters: IPersonFilters): Promise<IPagingData<IPerson | null>>;
  getPqrsdfs(): Promise<IPqrsdf[] | []>;
  createResponse(pqrsdf: IPqrsdf, file: MultipartFileContract): Promise<IPqrsdf | null>;
  getPersonByDocument(identification: number): Promise<IPerson | null>;
  getPqrsdfByFilters(filters: IPqrsdfFilters): Promise<IPagingData<IPqrsdf>>;
  updatePerson(person: IPerson): Promise<IPerson | null>;
  createPqrsdf(prsdf: IPqrsdf, file: MultipartFileContract, filedNumber: number): Promise<IPqrsdf | null>;
  updatePqrsdf(prsdf: IPqrsdf): Promise<IPqrsdf | null>;
  uploadFile(file: MultipartFileContract): Promise<boolean>;
  getPqrsdfByRequest(filters: IrequestPqrsdf): Promise<IPqrsdf[]>;
  createRequestReopen(justification: IReopenRequest): Promise<IReopenRequest | null>;
}
