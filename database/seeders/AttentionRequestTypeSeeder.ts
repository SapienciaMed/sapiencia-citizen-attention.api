import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import AttentionRequestType from "App/Models/AttentionRequestType";

export default class extends BaseSeeder {
  public async run() {
    await AttentionRequestType.createMany([
      {
        description: "Información general",
        order: 1,
      },
      {
        description: "Sugerencia",
        order: 2,
      },
      {
        description: "Denuncia",
        order: 3,
      },
      {
        description: "Queja o reclamo",
        order: 4,
      },
      {
        description: "Transferencia otra área",
        order: 5,
      },
      {
        description: "Soporte en trámite virtual",
        order: 6,
      },
    ]);
  }
}
