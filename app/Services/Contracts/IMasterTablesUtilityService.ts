import { ItypeRequest } from "App/Interfaces/MasterTablesUtilityInterfaces"
import { ApiResponse } from "App/Utils/ApiResponses"

export interface IMasterTablesUtilityService {
    getTypeRequest(): Promise<ApiResponse<ItypeRequest []|[] >>
}
