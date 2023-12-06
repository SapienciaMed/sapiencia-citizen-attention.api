import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import PrgPrograma from "App/Models/PrgPrograma";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Database.rawQuery("SET FOREIGN_KEY_CHECKS=0;");

    await PrgPrograma.truncate(false);

    await PrgPrograma.createMany([
      {
        prg_descripcion: "Becas Mejores Bachilleres",
        prg_clasificacion: 1,
        prg_dependencia: 8, //DIRECCIÓN TÉCNICA DE FONDOS
        prg_orden: 1,
      },

      {
        prg_descripcion: "Becas Mejores Deportistas",
        prg_clasificacion: 2,
        prg_dependencia: 8, //DIRECCIÓN TÉCNICA DE FONDOS
        prg_orden: 2,
      },

      {
        prg_descripcion: "Enlaza Mundos",
        prg_clasificacion: 3,
        prg_dependencia: 8, //DIRECCIÓN TÉCNICA DE FONDOS
        prg_orden: 3,
      },

      {
        prg_descripcion: "Formación Avanzada",
        prg_clasificacion: 4,
        prg_dependencia: 8, //DIRECCIÓN TÉCNICA DE FONDOS
        prg_orden: 4,
      },

      {
        prg_descripcion: "Extendiendo Fronteras Educativas",
        prg_clasificacion: 5,
        prg_dependencia: 8, //DIRECCIÓN TÉCNICA DE FONDOS
        prg_orden: 5,
      },

      {
        prg_descripcion: "EPM",
        prg_clasificacion: 5,
        prg_dependencia: 8, //DIRECCIÓN TÉCNICA DE FONDOS
        prg_orden: 6,
      },

      {
        prg_descripcion: "Presupuesto Participativo",
        prg_clasificacion: 2,
        prg_dependencia: 8, //DIRECCIÓN TÉCNICA DE FONDOS
        prg_orden: 7,
      },

      {
        prg_descripcion: "Becas Tecnologías",
        prg_clasificacion: 3,
        prg_dependencia: 4, //SUBDIRECCIÓN PARA LA GESTIÓN DE LA EDUCACIÓN POSTSECUNDARIA
        prg_orden: 8,
      },

      {
        prg_descripcion: "Matrícula Cero",
        prg_clasificacion: 4,
        prg_dependencia: 4, //SUBDIRECCIÓN PARA LA GESTIÓN DE LA EDUCACIÓN POSTSECUNDARIA
        prg_orden: 9,
      },

      {
        prg_descripcion: "Talento Especializado",
        prg_clasificacion: 5,
        prg_dependencia: 4, //SUBDIRECCIÓN PARA LA GESTIÓN DE LA EDUCACIÓN POSTSECUNDARIA
        prg_orden: 10,
      },
    ]);

    await Database.rawQuery("SET FOREIGN_KEY_CHECKS=1;");
  }
}
