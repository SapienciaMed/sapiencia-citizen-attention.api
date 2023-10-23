import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Corregimiento from "App/Models/Corregimiento";

export default class extends BaseSeeder {
  public async run() {
    await Corregimiento.createMany([
      { id: 1, name: "POPULAR", isActive: true, order: 1 },
      { id: 2, name: "SANTA CRUZ", isActive: true, order: 2 },
      { id: 3, name: "MANRIQUE", isActive: true, order: 3 },
      { id: 4, name: "ARANJUEZ", isActive: true, order: 4 },
      { id: 5, name: "CASTILLA", isActive: true, order: 5 },
      { id: 6, name: "DOCE DE OCTUBRE", isActive: true, order: 6 },
      { id: 7, name: "ROBLEDO", isActive: true, order: 7 },
      { id: 8, name: "VILLA HERMOSA", isActive: true, order: 8 },
      { id: 9, name: "BUENOS AIRES", isActive: true, order: 9 },
      { id: 10, name: "LA CANDELARIA", isActive: true, order: 10 },
      { id: 11, name: "LAURELES / ESTADIO", isActive: true, order: 11 },
      { id: 12, name: "LA AMERICA", isActive: true, order: 12 },
      { id: 13, name: "SAN JAVIER", isActive: true, order: 13 },
      { id: 14, name: "POBLADO", isActive: true, order: 14 },
      { id: 15, name: "GUAYABAL", isActive: true, order: 15 },
      { id: 16, name: "BELÉN", isActive: true, order: 16 },
      { id: 50, name: "SAN SEBASTIAN DE PALMITAS", isActive: true, order: 50 },
      { id: 60, name: "SAN CRISTOBAL", isActive: true, order: 60 },
      { id: 70, name: "ALTAVISTA", isActive: true, order: 70 },
      { id: 80, name: "SAN ANTONIO DE PRADO", isActive: true, order: 80 },
      { id: 90, name: "SANTA ELENA", isActive: true, order: 90 },
      { id: 99999, name: "No aplica", isActive: true, order: 0 },
    ]);
  }
}
