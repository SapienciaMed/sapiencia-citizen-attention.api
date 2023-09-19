import { IPrsdf } from "App/Interfaces/PqrsdfInterfaces";
import { IPqrsdfRepository } from "./Contracts/IPqrsdfRepository";

export default class Pqrsdf implements IPqrsdfRepository  {
   async createPrsdf(prsdf: IPrsdf): Promise<IPrsdf | null> {  
        return null;  
    }

   async getPrsdfById(id: number): Promise<IPrsdf | null> {
       return null;            
    }

   async getPrsdfByIdentificationAndFilingNumber(identification: number, filingNumber: number): Promise<IPrsdf | null> {
       return null; 
    }

   async getPrsdfs(): Promise<[] | IPrsdf[]> {

       return []; 
    }

   async updatePrsdf(prsdf: IPrsdf): Promise<IPrsdf | null> {

       return null; 
    }
}
