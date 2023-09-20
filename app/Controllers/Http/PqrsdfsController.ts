import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PqrsdfProvider from '@ioc:core.PqrsdfProvider';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class PqrsdfsController {
  public async getPrsdfById({ request, response }: HttpContextContract) {
    try {
        const { id } = request.params();
        return response.send(await PqrsdfProvider.getPrsdfById(id));
    } catch (err) {
        return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
}
}
