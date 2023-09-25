import { IMasterTablesUtilityRepository } from "./Contracts/IMasterTablesUtilityRepository";
import Database from "@ioc:Adonis/Lucid/Database";
import TsoTipoSolicitud from "App/Models/TsoTipoSolicitud";
import { ItypeRequest } from "App/Interfaces/MasterTablesUtilityInterfaces";


export default class MasterTablesUtilityRepository implements IMasterTablesUtilityRepository {
    // TODO : Consultas a DB
    async getTypeRequest(): Promise<ItypeRequest[] | [] > {
        let resp: any;
        const typeRequest  = await TsoTipoSolicitud.query().select('TSO_CODIGO','TSO_DESCRIPTION');

        resp = typeRequest
        
        return resp ? resp : null;
    }

}
