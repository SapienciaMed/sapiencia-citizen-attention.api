import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Hash from "@ioc:Adonis/Core/Hash";
import { DateTime } from "luxon";

import Person from 'App/Models/Person';

export default class extends BaseSeeder {
  public async run () {
    await Person.createMany([
      {
        identification: "797940",
        id: 1, // Reemplaza con el valor correcto
        entityTypeId: 1, // Reemplaza con el valor correcto
        firstName: "User",
        secondName: "",
        firstSurname: "797940",
        secondSurname: "",
       // birthdate: DateTime.fromJSDate(new Date("1990-01-01")).toISO(),
        firstContactNumber: "123456789",
        secondContactNumber: "",
        email: "user@example.com",
        address: "Dirección de Usuario",
        countryId: 1, // Reemplaza con el valor correcto
        departmentId: 1, // Reemplaza con el valor correcto
        municipalityId: 1, // Reemplaza con el valor correcto
        isBeneficiary: false,
        password: await Hash.make("123456789"), // Contraseña hasheada
      },
    ]);
  }
}
