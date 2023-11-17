import { IGenericData } from "App/Interfaces/GenericDataInterfaces"
import { ItypeRequest } from "App/Interfaces/MasterTablesUtilityInterfaces"
import { ApiResponse } from "App/Utils/ApiResponses"

export interface IMasterTablesUtilityService {
    getTypeRequest(): Promise<ApiResponse<ItypeRequest []|[] >>
    getTypeDocument(): Promise<ApiResponse<ItypeRequest []|[] >>
    getTensionChannels(): Promise<ApiResponse<ItypeRequest []|[] >>
    getAttentionChannelsDetails(id:number): Promise<ApiResponse<ItypeRequest []|[] >>
    getTypeLegalEntity(): Promise<ApiResponse<IGenericData[]|[] >>
    getTypeResponsePqrsdf(): Promise<ApiResponse<IGenericData[]|[] >>
    getFactors(): Promise<ApiResponse<IGenericData[]|[] >>
}
