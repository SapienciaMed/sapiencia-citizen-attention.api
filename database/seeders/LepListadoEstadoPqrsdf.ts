import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LepListadoEstadoPqrsdf from 'App/Models/LepListadoEstadoPqrsdf'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await LepListadoEstadoPqrsdf.createMany([

      {
        lep_estado:'Pendiente',
        lep_orden:1
      },

      {
        lep_estado:'Asignada',
        lep_orden:2
      },

      {
        lep_estado:'Cerrada',
        lep_orden:3
      },

      {
        lep_estado:'Pendiente VoBo Fondos',
        lep_orden:4
      },

      {
        lep_estado:'Pendiente VoBo Jurídico',
        lep_orden:5
      },

      {
        lep_estado:'Rechazada VoBo',
        lep_orden:6
      },

      {
        lep_estado:'Pendiente Director Técnico',
        lep_orden:7
      },

      {
        lep_estado:'Pendiente Abogado Fondos',
        lep_orden:8
      },

      {
        lep_estado:'Respuesta con prórroga',
        lep_orden:9
      },

      {
        lep_estado:'Pendiente Permanencia',
        lep_orden:10
      },

      {
        lep_estado:'Respuesta Permanencia',
        lep_orden:11
      },

    ]);
  }
}
