import { IDayType } from "App/Interfaces/DayTypeInterfaces";
import { IDaysParametrization } from "App/Interfaces/DaysParametrizationInterfaces";

export interface IDaysParametrizationRepository {
    getDaysParametrizationById(id: number): Promise<IDaysParametrization | null>;
    getDaysParametrizations(): Promise<IDaysParametrization[] | []>;
    getDayTypes(): Promise<IDayType[] | []>;
    createDaysParametrization(year: number): Promise<IDaysParametrization | null>;
    updateDaysParametrization(daysParametrization: IDaysParametrization): Promise<IDaysParametrization | null>
}
