import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import TetTipoEntidadTrabajo from "App/Models/TetTipoEntidadTrabajo";

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await Database.rawQuery("SET FOREIGN_KEY_CHECKS=0;");

    await TetTipoEntidadTrabajo.truncate(false);
    await TetTipoEntidadTrabajo.createMany([
      {
        tet_descripcion: "Atención Ciudadana",
        associatedStatusId: 1,
        dependenceId: 1, // atencion al ciudadano
        tet_orden: 1,
      },

      {
        tet_descripcion: "Fondos-Proyecta",
        associatedStatusId: 2,
        dependenceId: 8, // dirección técnica de fondos
        tet_orden: 2,
      },

      {
        tet_descripcion: "Fondos-VoBo",
        associatedStatusId: 4,
        dependenceId: 8, // dirección técnica de fondos
        tet_orden: 3,
      },

      {
        tet_descripcion: "Fondos-Abogado",
        associatedStatusId: 8,
        dependenceId: 8, // dirección técnica de fondos
        tet_orden: 4,
      },

      {
        tet_descripcion: "Fondos-DT",
        associatedStatusId: 7,
        dependenceId: 8, // dirección técnica de fondos
        tet_orden: 5,
      },

      {
        tet_descripcion: "Jurídica",
        associatedStatusId: 5,
        dependenceId: 8, // dirección técnica de fondos
        tet_orden: 6,
      },

      {
        tet_descripcion: "Permanencia",
        associatedStatusId: 10,
        dependenceId: 8, // dirección técnica de fondos
        tet_orden: 7,
      },
    ]);

    await Database.rawQuery("SET FOREIGN_KEY_CHECKS=1;");
  }
}
