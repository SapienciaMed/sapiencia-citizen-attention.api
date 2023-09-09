import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class ProgramasController {

    public async getPrograms({ response }: HttpContextContract ) {
        
        try {
            const programs = await Database.from('PRG_PROGRAMAS')
                                    .join('CLP_CLASIFICACION_PROGRAMA', 'PRG_PROGRAMAS.PRG_CLASIFICACION','CLP_CLASIFICACION_PROGRAMA.CLP_CODIGO')
                                    .join('DEP_DEPENDENCIA','PRG_PROGRAMAS.PRG_DEPENDENCIA', 'DEP_DEPENDENCIA.DEP_CODIGO' )
                                    .select('PRG_CODIGO','PRG_DESCRIPCION', 'CLP_CODIGO','CLP_DESCRIPCION','DEP_CODIGO','DEP_DESCRIPCION')
            return response.send({ 
                data: programs,
                status: true
            });

        } catch (err) {

            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
              );

        }

    };

}
