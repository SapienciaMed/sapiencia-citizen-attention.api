import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ClpClasificacionPrograma from 'App/Models/ClpClasificacionPrograma'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await ClpClasificacionPrograma.createMany([

      {
        clp_descripcion:'Crédito condonable pregrado',
        clp_programa:1,
        clp_orden: 1
      },

      {
        clp_descripcion:'Crédito condonable posgrado',
        clp_programa:2,
        clp_orden: 2
      },

      {
        clp_descripcion:'Becas',
        clp_programa:3,
        clp_orden: 3
      },

      {
        clp_descripcion:'Otro',
        clp_programa:4,
        clp_orden: 4
      },

      {
        clp_descripcion:'Ninguno',
        clp_programa:5,
        clp_orden: 5
      }

    ]);
  }
}
