import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ValueGroup from 'App/Models/ValueGroup';

export default class extends BaseSeeder {
  public async run () {
    await ValueGroup.createMany([
      {
        name: "Ciudadanía",
        order: 1,
      },
      {
        name: "Actores estratégicos en territorio",
        order: 2,
      },
      {
        name: "Entes de control",
        order: 3,
      },
      {
        name: "Entidades gubernamentales",
        order: 4,
      },
      {
        name: "Aliados estratégicos",
        order: 5,
      },
      {
        name: "Comunidad académica",
        order: 6,
      },
      {
        name: "Actores internos",
        order: 7,
      },
    ]);
  }
}
