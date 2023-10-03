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
      },

      //Becas mejores Deportistas
      {
        programId: 2,
        affairId: 11, //información general
      },
      {
        programId: 2,
        affairId: 12, //suspensiones temporales
      },
      {
        programId: 2,
        affairId: 13, //suspensiones especiales
      },
      {
        programId: 2,
        affairId: 14, //renuncias
      },
      {
        programId: 2,
        affairId: 15, //cambio de programa y univesidad
      },
      {
        programId: 2,
        affairId: 16, //pago intersemestral
      },
      {
        programId: 2,
        affairId: 17, //giro adicional 
      },
      {
        programId: 2,
        affairId: 18, //renovación extemporanea
      },
      {
        programId: 2,
        affairId: 19, //Resolución de terminación
      },

      //Enlaza mundos
      {
        programId: 3,
        affairId: 20, //información general
      },
      {
        programId: 3,
        affairId: 21, //cambio de actividades de transferencia
      },
      {
        programId: 3,
        affairId: 22, //suspensiones especiales
      },
      {
        programId: 3,
        affairId: 23, //renuncias
      },
      {
        programId: 3,
        affairId: 24, //Certificado del fondo- dolares
      },
      {
        programId: 3,
        affairId: 25, //Solicitud de condonación
      },
      {
        programId: 3,
        affairId: 26, //Certificado de declaración de renta
      },
      {
        programId: 3,
        affairId: 27, //prorroga al proceso de condonación
      },

      //Formación Avanzada
      {
        programId: 4,
        affairId: 28, //información general
      },
      {
        programId: 4,
        affairId: 29, //suspensiones temporales
      },
      {
        programId: 4,
        affairId: 30, //suspensiones especiales
      },
      {
        programId: 4,
        affairId: 31, //renuncias
      },
      {
        programId: 4,
        affairId: 32, //giro adicional 
      },
      {
        programId: 4,
        affairId: 33, //renovación extemporanea
      },
      {
        programId: 4,
        affairId: 34, //Solicitud de condonación
      },
      {
        programId: 4,
        affairId: 35, //Certificado del fondo
      },
      {
        programId: 4,
        affairId: 36, //cambio de propuesta de trabajo de grado
      },
      {
        programId: 4,
        affairId: 37, //prorroga al proceso de condonación
      },

      //Extendiendo Fronteras Educativas
      {
        programId: 5,
        affairId: 38, //información general
      },
      {
        programId: 5,
        affairId: 39, //suspensiones temporales
      },
      {
        programId: 5,
        affairId: 40, //suspensiones especiales
      },
      {
        programId: 5,
        affairId: 41, //rennuncias
      },
      {
        programId: 5,
        affairId: 42, //cambio de actividades de transferencia
      },
      {
        programId: 5,
        affairId: 43, //Certificado de declaración de renta
      },
      {
        programId: 5,
        affairId: 44, //renovación extemporanea
      },
      {
        programId: 5,
        affairId: 45, //Solicitud de condonación
      },
      {
        programId: 5,
        affairId: 46, //prorroga al proceso de condonación
      },

      //EPM
      {
        programId: 6,
        affairId: 47, //Información general del fondo
      },
      {
        programId: 6,
        affairId: 48, //Suspensión temporal
      },
      {
        programId: 6,
        affairId: 49, //Suspensión especial
      },
      {
        programId: 6,
        affairId: 50, //Cambio de programa y/o universidad
      },
      {
        programId: 6,
        affairId: 51, //Renovación del crédito y/o beca
      },
      {
        programId: 6,
        affairId: 52, //Solicitud de prórroga de período de gracia
      },
      {
        programId: 6,
        affairId: 53, //Solicitud de condonación del crédito
      },
      {
        programId: 6,
        affairId: 54, //Renuncia al fondo o a la beca
      },
      {
        programId: 6,
        affairId: 55, //Solicitud paso al cobro
      },
      {
        programId: 6,
        affairId: 56, //Aplazar – Adelantar servicio social
      },
      {
        programId: 6,
        affairId: 57, //Información general servicio social o transferencia de conocimiento
      },
      {
        programId: 6,
        affairId: 58, //Información giros pendientes / autorizados
      },
      {
        programId: 6,
        affairId: 59, //Derecho de petición
      },
      {
        programId: 6,
        affairId: 60, //Información general
      },
      {
        programId: 6,
        affairId: 61, //Certificado débito 10%
      },
      {
        programId: 6,
        affairId: 62, //Legalización fondo
      },
      {
        programId: 6,
        affairId: 63, //Inscripción convocatoria
      },
      {
        programId: 6,
        affairId: 64, //Otro
      },
      {
        programId: 6,
        affairId: 65, //Certificado de beneficio
      },
      {
        programId: 6,
        affairId: 66, //Solicitud de documentos y/o Expedientes
      },
      {
        programId: 6,
        affairId: 67, //Giro Adicional
      },
      {
        programId: 6,
        affairId: 68, //Solicitudes relacionadas al tema de convocatoria
      },
      {
        programId: 6,
        affairId: 69, //Certificado del 10% de fondo EPM
      },

      //PRESUPUESTO PARTICIPATIVO
      {
        programId: 7,
        affairId: 70, //Información general del fondo
      },
      {
        programId: 7,
        affairId: 71, //Suspensión temporal
      },
      {
        programId: 7,
        affairId: 72, //Suspensión especial
      },
      {
        programId: 7,
        affairId: 73, //Cambio de programa y/o universidad
      },
      {
        programId: 7,
        affairId: 74, //Renovación del crédito y/o beca
      },
      {
        programId: 7,
        affairId: 75, //Solicitud de prórroga de período de gracia
      },
      {
        programId: 7,
        affairId: 76, //Solicitud de condonación del crédito
      },
      {
        programId: 7,
        affairId: 77, //Renuncia al fondo o a la beca
      },
      {
        programId: 7,
        affairId: 78, //Solicitud paso al cobro
      },
      {
        programId: 7,
        affairId: 79, //Aplazar – Adelantar servicio social
      },
      {
        programId: 7,
        affairId: 80, //Información general servicio social o transferencia de conocimiento
      },
      {
        programId: 7,
        affairId: 81, //Información giros pendientes / autorizados
      },
      {
        programId: 7,
        affairId: 82, //Derecho de petición
      },
      {
        programId: 7,
        affairId: 83, //Información general
      },
      {
        programId: 7,
        affairId: 84, //Certificado débito 10%
      },
      {
        programId: 7,
        affairId: 85, //Legalización fondo
      },
      {
        programId: 7,
        affairId: 86, //Inscripción convocatoria
      },
      {
        programId: 7,
        affairId: 87, //Otro
      },
      {
        programId: 7,
        affairId: 88, //Certificado de beneficio
      },
      {
        programId: 7,
        affairId: 89, //Solicitud de documentos y/o Expedientes
      },
      {
        programId: 7,
        affairId: 90, //Giro Adicional
      },
      {
        programId: 7,
        affairId: 91, //Solicitudes relacionadas al tema de convocatoria
      },

      //Becas Tecnologías
      {
        programId: 8,
        affairId: 92, //Información general
      },
      {
        programId: 8,
        affairId: 93, //Cancelación temporal-Antes de matrícula
      },
      {
        programId: 8,
        affairId: 94, //Cancelación temporal-Después de matrícula
      },
      {
        programId: 8,
        affairId: 95, //Cambio de programa
      },
      {
        programId: 8,
        affairId: 96, //Proceso de renovación-Créditos aprobados
      },
      {
        programId: 8,
        affairId: 97, //Proceso de renovación-Créditos matriculados
      },
      {
        programId: 8,
        affairId: 98, //Derecho de petición
      },
      {
        programId: 8,
        affairId: 99, //Renuncia a la beca
      },
      {
        programId: 8,
        affairId: 100, //Renuncia al proceso
      },

       //Matricula Cero
      {
        programId: 9,
        affairId: 101, //Información general
      },
      {
        programId: 9,
        affairId: 102, //Suspensión temporal
      },
      {
        programId: 9,
        affairId: 103, //Suspensión especial
      },
      {
        programId: 8,
        affairId: 104, //Cambio de programa
      },
      {
        programId: 9,
        affairId: 105, //Proceso de renovación-Créditos aprobados
      },
      {
        programId: 9,
        affairId: 106, //Proceso de renovación-Créditos matriculados
      },
      {
        programId: 9,
        affairId: 107, //Derecho de petición
      },
      {
        programId: 9,
        affairId: 108, //Renuncia a la beca
      },
      {
        programId: 9,
        affairId: 109, //Renuncia al proceso
      },

      //Talento Especializado
      {
        programId: 10,
        affairId: 110, //Información general
      },
      {
        programId: 10,
        affairId: 111, //Inscripción de última convocatoria
      },
      {
        programId: 10,
        affairId: 112, //Matrícula última convocatoria
      },
      {
        programId: 10,
        affairId: 113, //Renuncia como beneficiario
      },

    ]);
  }
}
