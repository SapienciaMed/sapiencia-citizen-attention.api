import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

export default class TsoTipoSolicitudsController {

    public async getTipoSolicitudes({ response }: HttpContextContract ) {
        
        try {
            const solicituds = await Database.from('TSO_TIPO_SOLICITUD').select('TSO_CODIGO','TSO_DESCRIPTION')
            return response.send({ 
                data: solicituds,
                status: true
            });

        } catch (error) {
            
        }

    };

}
