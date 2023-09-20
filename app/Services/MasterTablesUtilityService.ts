import { IMasterTablesUtilityRepository } from "App/Repositories/Contracts/IMasterTablesUtilityRepository";
import { IMasterTablesUtilityService } from "./Contracts/IMasterTablesUtilityService";

export default class MasterTablesUtilityService implements IMasterTablesUtilityService {

    constructor( private MasterTablesUtilityRepository: IMasterTablesUtilityRepository ){}

    async getMaster() {
       this.MasterTablesUtilityRepository;
    }
}
