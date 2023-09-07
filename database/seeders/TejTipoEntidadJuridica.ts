import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TejTipoEntidadJuridica from 'App/Models/TejTipoEntidadJuridica'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await TejTipoEntidadJuridica.createMany([
      
      {
        tej_nombre:'Ente de control',
        tej_orden:1
      },

      {
        tej_nombre:'Privada',
        tej_orden:2
      },

      {
        tej_nombre:'Pública',
        tej_orden:3
      },

    ]);
  }
}
