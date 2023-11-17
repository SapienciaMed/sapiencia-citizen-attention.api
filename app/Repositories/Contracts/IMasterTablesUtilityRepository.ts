import { IGenericData } from "App/Interfaces/GenericDataInterfaces";
import { ItypeRequest } from "App/Interfaces/MasterTablesUtilityInterfaces"

export interface IMasterTablesUtilityRepository {
    getTypeRequest(): Promise<ItypeRequest[] | []>;
    getTypeDocuemnt(): Promise<ItypeRequest[] | []>;
    getAttentionChannels(): Promise<ItypeRequest[] | []>;
    getAttentionChannelsDetails(id: number): Promise<ItypeRequest[] | []>;
    getTypeLegalEntity(): Promise<IGenericData[] | []>;
    getTypeResponsePqrsdf(): Promise<IGenericData[] | []>;
    getFactors(): Promise<IGenericData[] | []>;
    getRequestSubject(): Promise<any>
}
