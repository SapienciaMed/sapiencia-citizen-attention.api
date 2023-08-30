import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PrgPrograma from 'App/Models/PrgPrograma'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await PrgPrograma.createMany([

      {
        prg_descripcion: 'Becas Mejores Bachilleres',
        prg_orden:1,
      },

      {
        prg_descripcion: 'Becas Mejores Deportistas',
        prg_orden:2
      },

      {
        prg_descripcion: 'Enlaza Mundos',
        prg_orden:3
      },

      {
        prg_descripcion: 'Formación Avanzada',
        prg_orden:4
      },

      {
        prg_descripcion: 'Extendiendo Fronteras Educativas',
        prg_orden:5
      },

      {
        prg_descripcion: 'EPM',
        prg_orden:6
      },

      {
        prg_descripcion: 'Presupuesto Participativo',
        prg_orden:7
      },

      {
        prg_descripcion: 'Becas Tecnologías',
        prg_orden:8
      },

      {
        prg_descripcion: 'Matrícula Cero',
        prg_orden:9
      },

      {
        prg_descripcion: 'Talento Especializado',
        prg_orden:10
      },

    ]);
  }
}
