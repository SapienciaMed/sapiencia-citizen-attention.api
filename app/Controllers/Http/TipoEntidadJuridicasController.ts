import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class TipoEntidadJuridicasController {

    public async getTypeEntidadJuridica({ response }: HttpContextContract ) {
        
        try {
            const typeEntidadJuridica = await Database.from('TEJ_TIPO_ENTIDAD_JURIDICA')
                                        .select('TEJ_CODIGO','TEJ_NOMBRE')
            return response.send({ 
                data: typeEntidadJuridica,
                status: true
            });

        } catch (err) {

            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
              );

        }

    };
    

}
