import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TetTipoEntidadTrabajo from 'App/Models/TetTipoEntidadTrabajo'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await TetTipoEntidadTrabajo.createMany([

      {
        tet_descripcion:'Atención Ciudadana',
        tet_orden:1
      },

      {
        tet_descripcion:'Fondos-Proyecta',
        tet_orden:2
      },

      {
        tet_descripcion:'Fondos-VoBo',
        tet_orden:3
      },

      {
        tet_descripcion:'Fondos-Abogado',
        tet_orden:4
      },

      {
        tet_descripcion:'Fondos-DT',
        tet_orden:5
      },

      {
        tet_descripcion:'Jurídica',
        tet_orden:6
      },

      {
        tet_descripcion:'Permanencia',
        tet_orden:7
      },


    ]);
  }
}
