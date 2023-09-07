import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import DepDependencia from 'App/Models/DepDependencia'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await DepDependencia.createMany([

      {
        dep_descripcion:'ATENCIÓN CIUDADANO',
        dep_orden:1
      },

      {
        dep_descripcion:'SUBDIRECCION ADMINISTRATIVA FINANCIERA Y DE APOYO A LA GESTION',
        dep_orden:2
      },

      {
        dep_descripcion:'OFICINA ASESORA JURIDICA',
        dep_orden:3
      },

      {
        dep_descripcion:'SUBDIRECCIÓN PARA LA GESTIÓN DE LA EDUCACIÓN POSTSECUNDARIA',
        dep_orden:4
      },

      {
        dep_descripcion:'DIRECCIÓN GENERAL',
        dep_orden:5
      },

      {
        dep_descripcion:'OFICINA',
        dep_orden:6
      },

      {
        dep_descripcion:'CARTERA',
        dep_orden:7
      },

      {
        dep_descripcion:'DE CONTROL INTERNO',
        dep_orden:8
      },

      {
        dep_descripcion:'DIRECCIÓN TÉCNICA DE FONDOS',
        dep_orden:9
      },


    ]);
  }
}
