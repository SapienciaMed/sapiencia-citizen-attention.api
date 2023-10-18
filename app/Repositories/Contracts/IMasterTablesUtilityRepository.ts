import { ItypeRequest } from "App/Interfaces/MasterTablesUtilityInterfaces"

export interface IMasterTablesUtilityRepository{
    getTypeRequest(): Promise< ItypeRequest[] | [] >;
    getTypeDocuemnt(): Promise< ItypeRequest[] | [] >;
    getAttentionChannels(): Promise< ItypeRequest[] | [] >;
}
