import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LpaListaParametro from 'App/Models/LpaListaParametro'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await LpaListaParametro.createMany([

      {
        lpa_descripcion:'Url de política de tratamiento de datos',
        lpa_valor: 'https://sapiencia.gov.co/wp-content/uploads/2020/12/pl-ap-gj-001_politica_tratamiento_datos_personales_v2.pdf',
        lpa_id_aplicativo: 1
      },

      {
        lpa_descripcion:'Url de consulta de PQRSDF',
        lpa_valor: 'xxxx',
        lpa_id_aplicativo: 2
      }

    ]);
  }
}
