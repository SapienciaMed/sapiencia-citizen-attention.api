import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MasterTablesUtilityProvider from '@ioc:core.MasterTablesUtilityProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class MasterTablesUtilitiesController {

  public async getRequestTypes({ response }: HttpContextContract) {
      try {
        response.send( await MasterTablesUtilityProvider.getTypeRequest())
      } catch (err) {
        return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
      }
  };

  public async getDocumentTypes({ response }: HttpContextContract) {
    try {
      response.send( await MasterTablesUtilityProvider.getTypeDocument())
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  };

  public async getTensionChannels({ response }: HttpContextContract) {
    try {
      response.send( await MasterTablesUtilityProvider.getTensionChannels())
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  };

}
