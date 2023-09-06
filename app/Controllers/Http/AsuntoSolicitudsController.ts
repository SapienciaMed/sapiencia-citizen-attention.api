import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class AsuntoSolicitudsController {

    public async asuntoSolicitud({ response }: HttpContextContract ) {
        
        try {
            const solicitudes = await Database.from('ASO_ASUNTO_SOLICITUD')
                                        .select('ASO_CODIGO','ASO_ASUNTO')
            return response.send({ 
                data: solicitudes,
                status: true
            });

        } catch (err) {

            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
              );

        }

    };

}
