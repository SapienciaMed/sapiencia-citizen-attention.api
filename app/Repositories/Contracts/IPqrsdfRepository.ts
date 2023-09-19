import { IPrsdf } from "App/Interfaces/PqrsdfInterfaces";

export interface IPqrsdfRepository {

    getPrsdfById(id: number): Promise<IPrsdf | null>;
    getPrsdfByIdentificationAndFilingNumber(identification: number, filingNumber: number): Promise<IPrsdf | null>;
    getPrsdfs(): Promise<IPrsdf[] | []>;
    createPrsdf(prsdf: IPrsdf): Promise<IPrsdf | null>;
    updatePrsdf(prsdf: IPrsdf): Promise<IPrsdf | null>
}
