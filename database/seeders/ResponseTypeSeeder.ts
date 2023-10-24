import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ResponseType from "App/Models/ResponseType";

export default class extends BaseSeeder {
  public async run() {
    await ResponseType.createMany([
      {
        description: "Trasladar a",
        order: 1,
      },
      {
        description: "Rechazar",
        order: 2,
      },
      {
        description: "Solicitar prórroga",
        order: 3,
      },
      {
        description: "Cerrar con respuesta",
        order: 4,
      },
      {
        description: "Cerrar sin respuesta",
        order: 5,
      },
      {
        description: "Trasladar por competencia",
        order: 6,
      },
      {
        description: "Reabierta",
        order: 7,
      },
    ]);
  }
}
