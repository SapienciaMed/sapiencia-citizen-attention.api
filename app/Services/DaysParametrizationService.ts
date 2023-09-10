import { IDaysParametrization } from "App/Interfaces/DaysParametrizationInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "../Constants/ResponseCodesEnum";
import { IDaysParametrizationService } from "./Contracts/IDaysParametrizationService";
import { IDaysParametrizationRepository } from "App/Repositories/Contracts/IDaysParametrizationRepository";
import { IDayType } from "App/Interfaces/DayTypeInterfaces";

export default class DaysParametrizationService implements IDaysParametrizationService {
    constructor(private DaysParametrizationRepository: IDaysParametrizationRepository) {}

    async getDaysParametrizationById(id: number): Promise<ApiResponse<IDaysParametrization | null>> {
        const res = await this.DaysParametrizationRepository.getDaysParametrizationById(id);

        if (!res) {
            return new ApiResponse({} as IDaysParametrization, EResponseCodes.FAIL, "Registro no encontrado");
        }

        return new ApiResponse(res, EResponseCodes.OK);
    }

    async getDaysParametrizations(): Promise<ApiResponse<IDaysParametrization[] | []>> {
        const res = await this.DaysParametrizationRepository.getDaysParametrizations();

        if (!res.length) {
            return new ApiResponse({} as IDaysParametrization[], EResponseCodes.FAIL, "Registros no encontrados");
        }

        return new ApiResponse(res, EResponseCodes.OK);
    }

    async getDayTypes(): Promise<ApiResponse<IDayType[] | []>> {
        const res = await this.DaysParametrizationRepository.getDayTypes();

        if (!res.length) {
            return new ApiResponse({} as IDayType[], EResponseCodes.FAIL, "Registros no encontrados");
        }

        return new ApiResponse(res, EResponseCodes.OK);
    }

    async createDaysParametrization(year: number): Promise<ApiResponse<IDaysParametrization | null>> {
        const res = await this.DaysParametrizationRepository.createDaysParametrization(year);

        if (!res) {
            return new ApiResponse({} as IDaysParametrization, EResponseCodes.FAIL, "No se puede crear el año");
        }

        return new ApiResponse(res, EResponseCodes.OK, "Año creado con éxito");
    }

    async updateDaysParametrization(daysParametrization: IDaysParametrization): Promise<ApiResponse<IDaysParametrization | null>> {
        const res = await this.DaysParametrizationRepository.updateDaysParametrization(daysParametrization);

        if (!res) {
            return new ApiResponse({} as IDaysParametrization, EResponseCodes.FAIL, "No se puede crear el calendario");
        }

        return new ApiResponse(res, EResponseCodes.OK, "Calendario modificado con éxito");
    }
}
