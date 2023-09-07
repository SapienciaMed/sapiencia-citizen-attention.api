import { IDayType } from "App/Interfaces/DayTypeInterfaces";
import { IDaysParametrization } from "App/Interfaces/DaysParametrizationInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IDaysParametrizationService {
    getDaysParametrizationById(id: number): Promise<ApiResponse<IDaysParametrization | null>>;
    getDaysParametrizations(): Promise<ApiResponse<IDaysParametrization[] | []>>;
    getDayTypes(): Promise<ApiResponse<IDayType[] | []>>;
    createDaysParametrization(year: number): Promise<ApiResponse<IDaysParametrization | null>>;
}
