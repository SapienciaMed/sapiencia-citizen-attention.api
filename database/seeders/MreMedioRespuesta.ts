import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MreMedioRespuesta from 'App/Models/MreMedioRespuesta'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await MreMedioRespuesta.createMany([

      {
        mre_descripcion: 'Correo electrónico',
        mre_orden: 1
      },

      {
        mre_descripcion: 'Física',
        mre_orden: 2
      }

    ]);
  }
}
