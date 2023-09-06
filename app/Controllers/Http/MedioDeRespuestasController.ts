import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class MedioDeRespuestasController {

    public async getMedioDeRespuesta({ response }: HttpContextContract ) {
        
        try {
            const medios = await Database.from('MRE_MEDIO_RESPUESTA')
                                        .select('MRE_CODIGO','MRE_DESCRIPCION')
            return response.send({ 
                data: medios,
                status: true
            });

        } catch (err) {

            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
              );

        }

    };

}
