import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import WorkEntityProvider from "@ioc:core.WorkEntityProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IWorkEntityFilters } from "App/Interfaces/WorkEntityInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class WorkEntityController {
  public async getWorkEntityById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await WorkEntityProvider.getWorkEntityById(id));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getUserByDocument({ request, response }: HttpContextContract) {
    try {
      const { identification } = request.params();
      return response.send(await WorkEntityProvider.getUserByDocument(identification));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getWorkEntityByFilters({ request, response }: HttpContextContract) {
    try {
      const filters  = request.body() as IWorkEntityFilters;
      return response.send(await WorkEntityProvider.getWorkEntityByFilters(filters));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getWorkEntityTypes({ response }: HttpContextContract) {
    try {
      return response.send(await WorkEntityProvider.getWorkEntityTypes());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async createWorkEntity({ request, response }: HttpContextContract) {
    try {
      const { workEntity }  = request.body();
      return response.send(await WorkEntityProvider.createWorkEntity(workEntity));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }
}
