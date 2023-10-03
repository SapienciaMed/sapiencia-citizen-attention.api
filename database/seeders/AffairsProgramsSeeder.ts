import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AffairsProgram from 'App/Models/AffairsProgram';

export default class extends BaseSeeder {
  public async run () {
    await AffairsProgram.createMany([
      //Becas Mejores Bachilleres
      {
        programId: 1,
        affairId: 1, //información general
      },
      {
        programId: 1,
        affairId: 2, //suspensiones temporales
      },
      {
        programId: 1,
        affairId: 3, //suspensiones especiales
      },
      {
        programId: 1,
        affairId: 4, //renuncias
      },
      {
        programId: 1,
        affairId: 5, //cambio de programa y univesidad
      },
      {
        programId: 1,
        affairId: 6, //pago intersemestral
      },
      {
        programId: 1,
        affairId: 7, //giro adicional
      },
      {
        programId: 1,
        affairId: 8, //renovación extemporanea
      },
      {
        programId: 1,
        affairId: 9, //Resolución de terminación
      },
      {
        programId: 1,
        affairId: 10, //Certificado de la beca
      }
    ]);
  }
}
