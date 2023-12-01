import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MotiveRequestSubject from 'App/Models/MotiveRequestSubject';

export default class extends BaseSeeder {
  public async run () {
    await MotiveRequestSubject.createMany([
      //Suspensión temporal
      {
        motiveId: 1, //Expresa Voluntad
        requestSubjectId: 2, //suspensiones temporales
      },
      {
        motiveId: 2, //Incumplimiento de requisitos
        requestSubjectId: 2, //suspensiones temporales
      },
      {
        motiveId: 3, //No renovó el crédito
        requestSubjectId: 2, //suspensiones temporales
      },
      {
        motiveId: 14, //No presentación de Documentos
        requestSubjectId: 2, //suspensiones temporales
      },

      //Suspensión especial
      {
        motiveId: 4, //Motivos de Salud (Fuerza Mayor)
        requestSubjectId: 3, //suspensiones especiales
      },
      {
        motiveId: 5, //Motivos de Salud (No es Fuerza Mayor)
        requestSubjectId: 3, //suspensiones especiales
      },
      {
        motiveId: 6, //Anormalidad Académica
        requestSubjectId: 3, //suspensiones especiales
      },
      {
        motiveId: 7, //Matrícula Cero
        requestSubjectId: 3, //suspensiones especiales
      },
      {
        motiveId: 8, //Beca
        requestSubjectId: 3, //suspensiones especiales
      },
      {
        motiveId: 9, //Prácticas, Pasantía, Intercambios
        requestSubjectId: 3, //suspensiones especiales
      },
      {
        motiveId: 10, //Servicio Militar
        requestSubjectId: 3, //suspensiones especiales
      },
      {
        motiveId: 11, //Otro
        requestSubjectId: 3, //suspensiones especiales
      },


      //Solicitud de condonación del crédito
      {
        motiveId: 13, //Obtiene grado
        requestSubjectId: 22, //Solicitud de condonación del crédito
      },


      //Renuncia al fondo o a la beca
      {
        motiveId: 12, //Renuncia por Expresa Voluntad
        requestSubjectId: 42, //Renuncia al fondo o a la beca
      },


      //Solicitud paso al cobro
      {
        motiveId: 1, //Expresa voluntad
        requestSubjectId: 23, //Solicitud paso al cobro
      },
    ]);
  }
}
