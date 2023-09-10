import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import DaysParametrizationProvider from "@ioc:core.DaysParametrizationProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IDaysParametrization } from "App/Interfaces/DaysParametrizationInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class DaysParametrizationController {
    public async getDaysParametrizationById({ request, response }: HttpContextContract) {
        try {
            const { id } = request.params();
            return response.send(await DaysParametrizationProvider.getDaysParametrizationById(id));
        } catch (err) {
            return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
        }
    }
    
    public async createDaysParametrization({ request, response }: HttpContextContract) {
        try {
            const { year } = request.body();
            return response.send(await DaysParametrizationProvider.createDaysParametrization(year));
        } catch (err) {
            return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
        }
    }
    
    public async updateDaysParametrization({ request, response }: HttpContextContract) {
        try {
            const { daysParametrization } = request.body();
            return response.send(await DaysParametrizationProvider.updateDaysParametrization(daysParametrization));
        } catch (err) {
            return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
        }
    }
    
    public async getDaysParametrizations({ response }: HttpContextContract) {
        try {            
            return response.send(await DaysParametrizationProvider.getDaysParametrizations());
        } catch (err) {
            return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
        }
    }
    
    public async getDayTypes({ response }: HttpContextContract) {
        try {            
            return response.send(await DaysParametrizationProvider.getDayTypes());
        } catch (err) {
            return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
        }
    }
}
