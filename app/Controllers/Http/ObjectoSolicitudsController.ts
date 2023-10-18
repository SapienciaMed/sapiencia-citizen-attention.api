import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class ObjectoSolicitudsController {

    public async getObjectoSolicitud({ response }: HttpContextContract ) {

        try {
            const paises = await Database.from('OBS_OBJECTO_SOLICITUD')
                                       .select('OBS_CODIGO','OBS_DESCRIPCION','OBS_TERMINO_DIAS')
            return response.send({
                data: paises,
                status: true
            });

        } catch (err) {

            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
              );

        }

    };
}
