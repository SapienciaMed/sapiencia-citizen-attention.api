import { IPerson } from "App/Interfaces/PersonInterfaces";
import { IPqrsdf } from "App/Interfaces/PqrsdfInterfaces";

export interface IPqrsdfRepository {
  getPqrsdfById(id: number): Promise<IPqrsdf | null>;
  getPqrsdfByIdentificationAndFilingNumber(identification: number, filingNumber: number): Promise<IPqrsdf | null>;
  getPqrsdfs(): Promise<IPqrsdf[] | []>;
  getPersonByDocument(identification: number): Promise<IPerson | null>;
  updatePerson(person: IPerson): Promise<IPerson | null>;
  createPqrsdf(prsdf: IPqrsdf): Promise<IPqrsdf | null>;
  updatePqrsdf(prsdf: IPqrsdf): Promise<IPqrsdf | null>;
}
