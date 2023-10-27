import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RequestSubjectTypeProvider from "@ioc:core.RequestSubjectTypeProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IRequestSubjectTypeFilters } from "App/Interfaces/RequestSubjectTypeInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class RequestSubjectTypeController {
  public async getRequestSubjectTypeById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await RequestSubjectTypeProvider.getRequestSubjectTypeById(id));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getRequestSubjectTypeByFilters({ request, response }: HttpContextContract) {
    try {
      const filters = request.body() as IRequestSubjectTypeFilters;
      return response.send(await RequestSubjectTypeProvider.getRequestSubjectTypeByFilters(filters));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getRequestObjects({ response }: HttpContextContract) {
    try {
      return response.send(await RequestSubjectTypeProvider.getRequestObjects());
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async createRequestSubjectType({ request, response }: HttpContextContract) {
    try {
      const { requestSubjectType } = request.body();
      return response.send(await RequestSubjectTypeProvider.createRequestSubjectType(requestSubjectType));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async updateRequestSubjectType({ request, response }: HttpContextContract) {
    try {
      const { requestSubjectType } = request.body();
      return response.send(await RequestSubjectTypeProvider.updateRequestSubjectType(requestSubjectType));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }
}
