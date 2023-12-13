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
        lpa_valor: 'https://fondos.sapiencia.gov.co/convocatorias/frontend_homeadmin/index.php/home/seguimiento?_gl=1*9617r5*_ga*MTAzMjIzMDk3Mi4xNjg4NTczODI1*_ga_GQDQ7JG1WG*MTY5NTMwNDI1Mi4yNy4wLjE2OTUzMDQyNTIuMC4wLjA.&_ga=2.163548602.700807419.1695304253-1032230972.1688573825',
        lpa_id_aplicativo: 2
      },
      {
        lpa_descripcion:'Url de consulta de PQRSDF',
        lpa_valor: 'https://fondos.sapiencia.gov.co/convocatorias/frontend_encuesta_satisfaccion/index.php/Cuestionario/fc_cargarvista',
        lpa_id_aplicativo: 2
      }

    ]);
  }
}
