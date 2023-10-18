import { IMasterTablesUtilityRepository } from "./Contracts/IMasterTablesUtilityRepository";
import TsoTipoSolicitud from "App/Models/TsoTipoSolicitud";
import CnaCanalesAtencion from "App/Models/CnaCanalesAtencion";
import CadCanalesAtencionDetalle from "App/Models/CadCanalesAtencionDetalle";
import { ItypeRequest } from "App/Interfaces/MasterTablesUtilityInterfaces";
import Database from "@ioc:Adonis/Lucid/Database";


export default class MasterTablesUtilityRepository implements IMasterTablesUtilityRepository {
    // TODO : Consultas a DB
    async getTypeRequest(): Promise<ItypeRequest[] | [] > {
        let resp: any;
        const typeRequest  = await TsoTipoSolicitud.query().select('TSO_CODIGO','TSO_DESCRIPTION');

        resp = typeRequest
        
        return resp ? resp : null;
    }

    async getTypeDocuemnt(): Promise<ItypeRequest[] | []> {
    let resp: any;
    const typeRequest  = await Database.from('aurora-core-dev . LGE_LISTADOS_GENERICOS')
                                        .where('LGE_AGRUPADOR','TIPOS_DOCUMENTOS')
                                        .select('LGE_CODIGO','LGE_ELEMENTO_DESCRIPCION')

    resp = typeRequest
    
    return resp ? resp : null;
    }

    async getAttentionChannels(): Promise<ItypeRequest[] | []> {
        let resp: any;

        const tensionChannels = await CnaCanalesAtencion.query().select('cna_codigo','cna_canal')
        resp = tensionChannels

        return resp ? resp : null;  
    };

    async getAttentionChannelsDetails(id:number): Promise<ItypeRequest[] | []> {
        let resp: any;

        const tensionChannels = await CadCanalesAtencionDetalle.query()
                                        .where("cad_id_canal", "=" , id)
                                        .select("cad_codigo","cad_nombre")
        resp = tensionChannels

        return resp ? resp : null;  
    };

}
