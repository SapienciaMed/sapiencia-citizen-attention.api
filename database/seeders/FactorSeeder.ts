import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Factor from "App/Models/Factor";

export default class extends BaseSeeder {
  public async run() {
    await Factor.createMany([
      {
        name: "Factor psicológico",
        order: 1,
      },
      {
        name: "Factor sociológico",
        order: 2,
      },
      {
        name: "Factor económico",
        order: 3,
      },
      {
        name: "Factor académico",
        order: 4,
      },
      {
        name: "Factor institucional",
        order: 5,
      },
    ]);
  }
}
