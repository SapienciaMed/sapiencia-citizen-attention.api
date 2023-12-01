import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import AsoAsuntoSolicitud from "App/Models/AsoAsuntoSolicitud";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await Database.rawQuery("SET FOREIGN_KEY_CHECKS=0;");

    await AsoAsuntoSolicitud.truncate(false);
    await AsoAsuntoSolicitud.updateOrCreateMany(
      ["aso_asunto", "aso_orden"],
      [
        {
          aso_asunto: "Información general",
          aso_orden: 1,
        },
        {
          aso_asunto: "Suspensiones temporales",
          aso_orden: 2,
        },

        {
          aso_asunto: "Suspensiones especiales",
          aso_orden: 3,
        },

        {
          aso_asunto: "Renuncias",
          aso_orden: 4,
        },

        {
          aso_asunto: "Cambio de programa y universidad",
          aso_orden: 5,
        },

        {
          aso_asunto: "Pago intersemestral",
          aso_orden: 6,
        },

        {
          aso_asunto: "Giro adicional",
          aso_orden: 7,
        },

        {
          aso_asunto: "Renovación extemporánea",
          aso_orden: 8,
        },

        {
          aso_asunto: "Resolución de terminación",
          aso_orden: 9,
        },

        {
          aso_asunto: "Certificado de la beca",
          aso_orden: 10,
        },

        {
          aso_asunto: "Cambio de actividades de transferencia",
          aso_orden: 11,
        },

        {
          aso_asunto: "Certificado del fondo-dolares",
          aso_orden: 12,
        },

        {
          aso_asunto: "Solicitud de condonación",
          aso_orden: 13,
        },

        {
          aso_asunto: "Certificado de declaración de renta",
          aso_orden: 14,
        },

        {
          aso_asunto: "Prorroga al proceso de condonación",
          aso_orden: 15,
        },

        {
          aso_asunto: "Renovación extemporanea",
          aso_orden: 16,
        },

        {
          aso_asunto: "Certificado del fondo",
          aso_orden: 17,
        },

        {
          aso_asunto: "Cambio de propuesta de trabajo de grado",
          aso_orden: 18,
        },

        {
          aso_asunto: "Información general del fondo",
          aso_orden: 19,
        },

        {
          aso_asunto: "Renovación del crédito y/o beca",
          aso_orden: 20,
        },

        {
          aso_asunto: "Solicitud de prórroga de período de gracia",
          aso_orden: 21,
        },

        {
          aso_asunto: "Solicitud de condonación del crédito",
          aso_orden: 22,
        },

        {
          aso_asunto: "Solicitud paso al cobro",
          aso_orden: 23,
        },

        {
          aso_asunto: "Aplazar – Adelantar servicio social",
          aso_orden: 24,
        },

        {
          aso_asunto: "Información general servicio social o transferencia de conocimiento",
          aso_orden: 25,
        },

        {
          aso_asunto: "Información giros pendientes / autorizados",
          aso_orden: 26,
        },

        {
          aso_asunto: "Derecho de petición",
          aso_orden: 27,
        },

        {
          aso_asunto: "Certificado débito 10%",
          aso_orden: 28,
        },

        {
          aso_asunto: "Legalización fondo",
          aso_orden: 29,
        },

        {
          aso_asunto: "Inscripción convocatoria",
          aso_orden: 30,
        },

        {
          aso_asunto: "Otro",
          aso_orden: 31,
        },

        {
          aso_asunto: "Certificado de beneficio",
          aso_orden: 32,
        },

        {
          aso_asunto: "Solicitud de documentos y/o Expedientes",
          aso_orden: 33,
        },

        {
          aso_asunto: "Solicitudes relacionadas al tema de convocatoria",
          aso_orden: 34,
        },

        {
          aso_asunto: "Certificado del 10% de fondo EPM",
          aso_orden: 35,
        },

        {
          aso_asunto: "Suspensión especial",
          aso_orden: 36,
        },

        {
          aso_asunto: "Cancelación temporal-Antes de matrícula",
          aso_orden: 37,
        },

        {
          aso_asunto: "Cancelación temporal-Después de matrícula",
          aso_orden: 38,
        },

        {
          aso_asunto: "Cambio de programa",
          aso_orden: 39,
        },

        {
          aso_asunto: "Proceso de renovación-Créditos aprobados",
          aso_orden: 40,
        },

        {
          aso_asunto: "Proceso de renovación-Créditos matriculados",
          aso_orden: 41,
        },

        {
          aso_asunto: "Renuncia a la beca",
          aso_orden: 42,
        },

        {
          aso_asunto: "Renuncia al proceso",
          aso_orden: 43,
        },

        {
          aso_asunto: "Inscripción de última convocatoria",
          aso_orden: 44,
        },

        {
          aso_asunto: "Matrícula última convocatoria",
          aso_orden: 45,
        },

        {
          aso_asunto: "Renuncia como beneficiario",
          aso_orden: 46,
        },
      ]
    );

    await Database.rawQuery("SET FOREIGN_KEY_CHECKS=1;");
  }
}
