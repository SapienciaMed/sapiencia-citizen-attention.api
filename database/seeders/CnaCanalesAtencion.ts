import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CnaCanalesAtencion from 'App/Models/CnaCanalesAtencion'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await CnaCanalesAtencion.createMany([

      {
        cna_canal: 'Canales virtuales',
        cna_orden: 0
      },

      {
        cna_canal: 'Chat',
        cna_orden: 1
      },

      {
        cna_canal: 'Correo electrónico',
        cna_orden: 2
      },

      {
        cna_canal: 'Pesencial',
        cna_orden: 3
      },

      {
        cna_canal: 'Telefónico',
        cna_orden: 4
      },

      {
        cna_canal: 'Web',
        cna_orden: 5
      },

    ]);

  }
}
