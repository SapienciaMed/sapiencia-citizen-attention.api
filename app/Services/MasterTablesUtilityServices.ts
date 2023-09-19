import { IMasterTablesUtilityRepository } from "App/Repositories/Contracts/IMasterTablesUtilityRepository";
import { IMasterTablesUtilityServices } from "./Contracts/IMasterTablesUtilityServices";

export default class MasterTablesUtilityServices implements IMasterTablesUtilityServices {

    constructor( private MasterTablesUtilityRepository: IMasterTablesUtilityRepository ){}

}
