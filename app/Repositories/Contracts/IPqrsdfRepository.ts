import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import {
  IPqrsdf,
  IPqrsdfFilters,
  IPqrsdfResponse,
  IReopenRequest,
  IResponseFilters,
  IrequestPqrsdf,
} from "App/Interfaces/PqrsdfInterfaces";
import File from "App/Models/File";
import { IPagingData } from "App/Utils/ApiResponses";

export interface IPqrsdfRepository {
  getPqrsdfById(id: number): Promise<IPqrsdf | null>;
  getPqrsdfByIdentificationAndFilingNumber(identification: number, filingNumber: number): Promise<IPqrsdf | null>;
  getPeopleByFilters(filters: IPersonFilters): Promise<IPagingData<IPerson | null>>;
  getPqrsdfs(): Promise<IPqrsdf[] | []>;
  createResponse(
    pqrsdf: IPqrsdf,
    file: MultipartFileContract,
    supportFiles: MultipartFileContract[]
  ): Promise<IPqrsdf | null>;
  getPersonByDocument(identification: number): Promise<IPerson | null>;
  getPqrsdfByFilters(filters: IPqrsdfFilters): Promise<IPagingData<IPqrsdf>>;
  updatePerson(person: IPerson): Promise<IPerson | null>;
  getPqrsdfResponnses(filters: IResponseFilters): Promise<IPagingData<IPqrsdfResponse | null>>;
  createPqrsdf(prsdf: IPqrsdf, file: MultipartFileContract, filedNumber: number): Promise<IPqrsdf | null>;
  updatePqrsdf(prsdf: IPqrsdf, fields: string[], newSupportFiles: File[]): Promise<IPqrsdf | null>;
  uploadFile(file: MultipartFileContract): Promise<boolean>;
  getPqrsdfByRequest(filters: IrequestPqrsdf): Promise<IPqrsdf[]>;
  createRequestReopen(justification: IReopenRequest): Promise<IReopenRequest | null>;

  getProgramByUser(payload: any): Promise<any>
  getSubjectByUser(payload: any): Promise<any>
}
