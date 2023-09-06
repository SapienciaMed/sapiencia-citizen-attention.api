import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AsoAsuntoSolicitud from 'App/Models/AsoAsuntoSolicitud'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await AsoAsuntoSolicitud.createMany([

      {
        aso_asunto:'Información general',
        aso_dias_habiles:5,
        aso_orden:1
      },

      {
        aso_asunto:'Suspensiones temporales',
        aso_dias_habiles:5,
        aso_orden:2
      },

      {
        aso_asunto:'Suspensiones especiales',
        aso_dias_habiles:5,
        aso_orden:3
      },

      {
        aso_asunto:'Renuncias',
        aso_dias_habiles:5,
        aso_orden:4
      },

      {
        aso_asunto:'Cambio de programa y universidad',
        aso_dias_habiles:5,
        aso_orden:5
      },

      {
        aso_asunto:'Pago intersemestral',
        aso_dias_habiles:5,
        aso_orden:6
      },

      {
        aso_asunto:'Giro adicional',
        aso_dias_habiles:5,
        aso_orden:7
      },

      {
        aso_asunto:'Renovación extemporánea',
        aso_dias_habiles:5,
        aso_orden:8
      },

      {
        aso_asunto:'Resolución de terminación',
        aso_dias_habiles:5,
        aso_orden:9
      },

      {
        aso_asunto:'Certificado de la beca',
        aso_dias_habiles:5,
        aso_orden:10
      },

    ]);
  }
}
