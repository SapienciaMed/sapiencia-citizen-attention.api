import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import { EResponseCodes } from 'App/Constants/ResponseCodesEnum';
import { ApiResponse } from 'App/Utils/ApiResponses';

export default class ListadoGenericosController {

    public async getTypeDocuement({ response }: HttpContextContract ) {
        
        try {
            const typeDocuments = await Database.from('aurora-core-dev . LGE_LISTADOS_GENERICOS')
                                        .where('LGE_AGRUPADOR','TIPOS_DOCUMENTOS')
                                        .select('LGE_CODIGO','LGE_ELEMENTO_DESCRIPCION')
            return response.send({ 
                data: typeDocuments,
                status: true
            });

        } catch (err) {

            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
              );

        }

    };

    public async getPaises({ response }: HttpContextContract ) {
        
        try {
            const paises = await Database.from('aurora-core-dev . LGE_LISTADOS_GENERICOS')
                                        .where('LGE_AGRUPADOR','PAISES')
                                        .select('LGE_CODIGO','LGE_ELEMENTO_DESCRIPCION')
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

    public async getDepartamentos({ response }: HttpContextContract ) {
        

        try {
            const departamentos = await Database.from('aurora-core-dev . LGE_LISTADOS_GENERICOS')
                                       .where('LGE_AGRUPADOR', 'DEPARTAMENTOS')
                                        //.select('LGE_CODIGO','LGE_ELEMENTO_CODIGO')
            return response.send({ 
                data: departamentos,
                status: true
            });

        } catch (err) {

            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
              );

        }

    };

    public async getMunicipios({ response, request }: HttpContextContract ) {
        
        const { id } = request.params();

        try {
            const municipios = await Database.from('aurora-core-dev . LGE_LISTADOS_GENERICOS')
                                       .where('LGE_CAMPOS_ADICIONALES','LIKE', `{"departmentId": "${id}"}%`)
                                        //.select('LGE_CODIGO','LGE_ELEMENTO_CODIGO')
            return response.send({ 
                data: municipios,
                status: true
            });

        } catch (err) {

            return response.badRequest(
                new ApiResponse(null, EResponseCodes.FAIL, String(err))
              );

        }

    };
    
}
