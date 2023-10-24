import { IMasterTablesUtilityRepository } from "App/Repositories/Contracts/IMasterTablesUtilityRepository";
import { IMasterTablesUtilityService } from "./Contracts/IMasterTablesUtilityService";
import { ItypeRequest } from "App/Interfaces/MasterTablesUtilityInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";

export default class MasterTablesUtilityService implements IMasterTablesUtilityService {

    constructor( private MasterTablesUtilityRepository: IMasterTablesUtilityRepository ){}

    public async getTypeRequest(): Promise<ApiResponse<ItypeRequest []|[] >> {
        const resp = await this.MasterTablesUtilityRepository.getTypeRequest();
        
        if(!resp){
            return  new ApiResponse({} as ItypeRequest[], EResponseCodes.FAIL, "Error al consultar Tipos de solicitud");
        }
        return new ApiResponse(resp, EResponseCodes.OK);
    }

    public async getTypeDocument(): Promise<ApiResponse<ItypeRequest[] | []>> {

        const resp = await this.MasterTablesUtilityRepository.getTypeDocuemnt();
        
        if(!resp){
            return  new ApiResponse({} as ItypeRequest[], EResponseCodes.FAIL, "Error al consultar Tipos de Documentos");
        }
        return new ApiResponse(resp, EResponseCodes.OK);
    }

    public async getTensionChannels(): Promise<ApiResponse<ItypeRequest[] | []>> {

        const resp = await this.MasterTablesUtilityRepository.getAttentionChannels();
        
        if(!resp){
            return  new ApiResponse({} as ItypeRequest[], EResponseCodes.FAIL, "Error al consultar Tipos de Documentos");
        }
        return new ApiResponse(resp, EResponseCodes.OK);
    }

    public async getAttentionChannelsDetails(id: number): Promise<ApiResponse<ItypeRequest[] | []>> {
        const resp = await this.MasterTablesUtilityRepository.getAttentionChannelsDetails(id);
        
        if(!resp){
            return  new ApiResponse({} as ItypeRequest[], EResponseCodes.FAIL, "Error al consultar Tipos de Documentos");
        }
        return new ApiResponse(resp, EResponseCodes.OK);
    }

}
