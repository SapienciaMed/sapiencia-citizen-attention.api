import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import TrafficLightPqrsdfDay from "App/Models/TrafficLightPqrsdfDay";

export default class extends BaseSeeder {
  public async run() {
    await TrafficLightPqrsdfDay.createMany([
      {
        initialDay: 0,
        finalDay: 30,
        color: "#03fc52",
      },
      {
        initialDay: 31,
        finalDay: 75,
        color: "#fcfc03",
      },
      {
        initialDay: 76,
        finalDay: 99999,
        color: "#fc0318",
      },
    ]);
  }
}
