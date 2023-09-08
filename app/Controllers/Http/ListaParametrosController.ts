import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class ListaParametrosController {

    public async getListaParametros({ response }: HttpContextContract ) {
        
        try {
            const parametros = await Database.from('LPA_LISTA_PARAMETROS')
                                    .where('LPA_CODIGO',1)
                                      .select('LPA_VALOR')
            return response.send( parametros );

        } catch (err) {

            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
              );

        }

    };

}
