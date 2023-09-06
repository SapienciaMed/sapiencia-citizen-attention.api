import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TsoTipoSolicitud from 'App/Models/TsoTipoSolicitud'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await TsoTipoSolicitud.createMany([

      {
        tso_description: 'Pregunta',
        tso_orden: 1
      },

      {
        tso_description: 'Quejas',
        tso_orden: 2
      },

      {
        tso_description: 'Reclamos',
        tso_orden: 3
      },

      {
        tso_description: 'Solicitudes',
        tso_orden: 4
      },

      {
        tso_description: 'Denuncias',
        tso_orden: 5
      },

      {
        tso_description: 'Felicitaciones',
        tso_orden: 6
      }

    ]);
  }
}
