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
        affairId: 1, //información general
      },
      {
        programId: 2,
        affairId: 2, //suspensiones temporales
      },
      {
        programId: 2,
        affairId: 3, //suspensiones especiales
      },
      {
        programId: 2,
        affairId: 4, //renuncias
      },
      {
        programId: 2,
        affairId: 5, //cambio de programa y univesidad
      },
      {
        programId: 2,
        affairId: 6, //pago intersemestral
      },
      {
        programId: 2,
        affairId: 7, //giro adicional
      },
      {
        programId: 2,
        affairId: 8, //renovación extemporanea
      },
      {
        programId: 2,
        affairId: 9, //Resolución de terminación
      },
      //Enlaza mundos
      {
        programId: 3,
        affairId: 1, //información general
      },
      {
        programId: 3,
        affairId: 11, //cambio de actividades de transferencia
      },
      {
        programId: 3,
        affairId: 3, //suspensiones especiales
      },
      {
        programId: 3,
        affairId: 4, //renuncias
      },
      {
        programId: 3,
        affairId: 12, //certificado del fondo-dolares
      },
      {
        programId: 3,
        affairId: 13, //solicitud de condonación
      },
      {
        programId: 3,
        affairId: 14, //certificado de declaración de renta
      },
      {
        programId: 3,
        affairId: 15, //prorroga al proceso de condonación
      },

      //Formación Avanzada
      {
        programId: 4,
        affairId: 1, //información general
      },
      {
        programId: 4,
        affairId: 2, //suspensiones temporales
      },
      {
        programId: 4,
        affairId: 3, //suspensiones especiales
      },
      {
        programId: 4,
        affairId: 4, //renuncias
      },
      {
        programId: 4,
        affairId: 7, //giro adicional
      },
      {
        programId: 4,
        affairId: 16, //renovación extemporanea
      },
      {
        programId: 4,
        affairId: 13, //solicitud de condonación
      },
      {
        programId: 4,
        affairId: 17, //certificado del fondo
      },
      {
        programId: 4,
        affairId: 18, //cambio de propuesta de trabajo de grado
      },
      {
        programId: 4,
        affairId: 15, //prorroga al proceso de condonación
      },

      //Extendiendo Fronteras Educativas
      {
        programId: 5,
        affairId: 5, //información general
      },
      {
        programId: 5,
        affairId: 2, //suspensiones temporales
      },
      {
        programId: 5,
        affairId: 3, //suspensiones especiales
      },
      {
        programId: 5,
        affairId: 4, //renuncias
      },
      {
        programId: 5,
        affairId: 11, //cambio de actividades de transferencia
      },
      {
        programId: 5,
        affairId: 14, //certificado de declaración de renta
      },
      {
        programId: 5,
        affairId: 8, //renovación extemporanea
      },
      {
        programId: 5,
        affairId: 13, //solicitud de condonación
      },
      {
        programId: 5,
        affairId: 15, //prorroga al proceso de condonación
      },

      //EPM
      {
        programId: 6,
        affairId: 19, //Información general del fondo
      },
      {
        programId: 6,
        affairId: 2, //suspensiones temporales
      },
      {
        programId: 6,
        affairId: 3, //suspensiones especiales
      },
      {
        programId: 6,
        affairId: 5, //Cambio de programa y/o universidad
      },
      {
        programId: 6,
        affairId: 20, //Renovación del crédito y/o beca
      },
      {
        programId: 6,
        affairId: 21, //Solicitud de prórroga de período de gracia
      },
      {
        programId: 6,
        affairId: 22, //Solicitud de condonación del crédito
      },
      {
        programId: 6,
        affairId: 23, //Renuncia al fondo o a la beca
      },
      {
        programId: 6,
        affairId: 23, //Solicitud paso al cobro
      },
      {
        programId: 6,
        affairId: 24, //Aplazar – Adelantar servicio social
      },
      {
        programId: 6,
        affairId: 25, //Información general servicio social o transferencia de conocimiento
      },
      {
        programId: 6,
        affairId: 26, //Información giros pendientes / autorizados
      },
      {
        programId: 6,
        affairId: 27, //Derecho de petición
      },
      {
        programId: 6,
        affairId: 1, //Información general
      },
      {
        programId: 6,
        affairId: 28, //Certificado débito 10%
      },
      {
        programId: 6,
        affairId: 29, //Legalización fondo
      },
      {
        programId: 6,
        affairId: 30, //Inscripción convocatoria
      },
      {
        programId: 6,
        affairId: 31, //Otro
      },
      {
        programId: 6,
        affairId: 32, //Certificado de beneficio
      },
      {
        programId: 6,
        affairId: 33, //Solicitud de documentos y/o Expedientes
      },
      {
        programId: 6,
        affairId: 7, //Giro Adicional
      },
      {
        programId: 6,
        affairId: 34, //Solicitudes relacionadas al tema de convocatoria
      },
      {
        programId: 6,
        affairId: 35, //Certificado del 10% de fondo EPM
      },

      //PRESUPUESTO PARTICIPATIVO
      {
        programId: 7,
        affairId: 19, //Información general del fondo
      },
      {
        programId: 7,
        affairId: 20, //Suspensión temporal
      },
      {
        programId: 7,
        affairId: 36, //Suspensión especial
      },
      {
        programId: 7,
        affairId: 5, //Cambio de programa y/o universidad
      },
      {
        programId: 7,
        affairId: 20, //Renovación del crédito y/o beca
      },
      {
        programId: 7,
        affairId: 21, //Solicitud de prórroga de período de gracia
      },
      {
        programId: 7,
        affairId: 22, //Solicitud de condonación del crédito
      },
      {
        programId: 7,
        affairId: 23, //Renuncia al fondo o a la beca
      },
      {
        programId: 7,
        affairId: 23, //Solicitud paso al cobro
      },
      {
        programId: 7,
        affairId: 24, //Aplazar – Adelantar servicio social
      },
      {
        programId: 7,
        affairId: 25, //Información general servicio social o transferencia de conocimiento
      },
      {
        programId: 7,
        affairId: 26, //Información giros pendientes / autorizados
      },
      {
        programId: 7,
        affairId: 27, //Derecho de petición
      },
      {
        programId: 7,
        affairId: 1, //Información general
      },
      {
        programId: 7,
        affairId: 28, //Certificado débito 10%
      },
      {
        programId: 7,
        affairId: 29, //Legalización fondo
      },
      {
        programId: 7,
        affairId: 30, //Inscripción convocatoria
      },
      {
        programId: 7,
        affairId: 31, //Otro
      },
      {
        programId: 7,
        affairId: 32, //Certificado de beneficio
      },
      {
        programId: 7,
        affairId: 33, //Solicitud de documentos y/o Expedientes
      },
      {
        programId: 7,
        affairId: 7, //Giro Adicional
      },
      {
        programId: 7,
        affairId: 34, //Solicitudes relacionadas al tema de convocatoria
      },

      //Becas Tecnologías
      {
        programId: 8,
        affairId: 1, //Información general
      },
      {
        programId: 8,
        affairId: 37, //Cancelación temporal-Antes de matrícula
      },
      {
        programId: 8,
        affairId: 38, //Cancelación temporal-Después de matrícula
      },
      {
        programId: 8,
        affairId: 39, //Cambio de programa
      },
      {
        programId: 8,
        affairId: 40, //Proceso de renovación-Créditos aprobados
      },
      {
        programId: 8,
        affairId: 41, //Proceso de renovación-Créditos matriculados
      },
      {
        programId: 8,
        affairId: 27, //Derecho de petición
      },
      {
        programId: 8,
        affairId: 42, //Renuncia a la beca
      },
      {
        programId: 8,
        affairId: 43, //Renuncia al proceso
      },

       //Matricula Cero
      {
        programId: 9,
        affairId: 1, //Información general
      },
      {
        programId: 9,
        affairId: 20, //Suspensión temporal
      },
      {
        programId: 9,
        affairId: 36, //Suspensión especial
      },
      {
        programId: 9,
        affairId: 39, //Cambio de programa
      },
      {
        programId: 9,
        affairId: 40, //Proceso de renovación-Créditos aprobados
      },
      {
        programId: 9,
        affairId: 41, //Proceso de renovación-Créditos matriculados
      },
      {
        programId: 9,
        affairId: 27, //Derecho de petición
      },
      {
        programId: 9,
        affairId: 42, //Renuncia a la beca
      },
      {
        programId: 9,
        affairId: 43, //Renuncia al proceso
      },

      //Talento Especializado
      {
        programId: 10,
        affairId: 1, //Información general
      },
      {
        programId: 10,
        affairId: 44, //Inscripción de última convocatoria
      },
      {
        programId: 10,
        affairId: 45, //Matrícula última convocatoria
      },
      {
        programId: 10,
        affairId: 46, //Renuncia como beneficiario
      },

    ]);
  }
}
