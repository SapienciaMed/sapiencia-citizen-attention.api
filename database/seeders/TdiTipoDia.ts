import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TdiTipoDia from 'App/Models/TdiTipoDia'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await TdiTipoDia.createMany([

      {
        tdi_descripcion:'Laboral',
        tdi_orden:1
      },

      {
        tdi_descripcion:'No laboral por festivo',
        tdi_orden:2
      },

      {
        tdi_descripcion:'No laboral por resolución',
        tdi_orden:3
      },

      {
        tdi_descripcion:'Otro',
        tdi_orden:4
      },

    ]);
  }
}
