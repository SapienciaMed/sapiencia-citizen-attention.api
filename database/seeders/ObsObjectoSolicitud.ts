import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ObsObjectoSolicitud from 'App/Models/ObsObjectoSolicitud'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await ObsObjectoSolicitud.createMany([

      {
        obs_description:'Información General o Particular',
        obs_termino_dias: 15,
        obs_orden: 1
      },

      {
        obs_description:'Petición de documentos (Copias)',
        obs_termino_dias: 10,
        obs_orden: 2
      },

      {
        obs_description:'Consultas Especializadas (Conceptos)',
        obs_termino_dias: 30,
        obs_orden: 3
      },

      {
        obs_description:'Quejas',
        obs_termino_dias: 15,
        obs_orden: 4
      }

    ])
  }
}
