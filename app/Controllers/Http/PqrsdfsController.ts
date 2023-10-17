import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PqrsdfProvider from "@ioc:core.PqrsdfProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class PqrsdfsController {
  public async getPrsdfById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await PqrsdfProvider.getPrsdfById(id));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getPersonByDocument({ request, response }: HttpContextContract) {
    try {
      const { identification } = request.params();
      return response.send(await PqrsdfProvider.getPersonByDocument(identification));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getPqrsdfByIdentificationAndFilingNumber({ request, response }: HttpContextContract) {
    try {
      const { identification, filingNumber } = request.all();
      return response.send(await PqrsdfProvider.getPqrsdfByIdentificationAndFilingNumber(identification, filingNumber));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async createPqrsdf({ request, response }: HttpContextContract) {
    try {
      const { pqrsdf }  = request.body();
      return response.send(await PqrsdfProvider.createPqrsdf(pqrsdf));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }
}
