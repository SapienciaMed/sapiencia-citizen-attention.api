import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CadCanalesAtencionDetalle from 'App/Models/CadCanalesAtencionDetalle'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await CadCanalesAtencionDetalle.createMany([

      {
        cad_nombre:'Ciudadela',
        cad_id_canal:1,
        cad_orden:1
      },

      {
        cad_nombre:'Mazo',
        cad_id_canal:2,
        cad_orden:2
      },

      {
        cad_nombre:'Sede centra',
        cad_id_canal:3,
        cad_orden:3
      },

    ]);
  }
}
