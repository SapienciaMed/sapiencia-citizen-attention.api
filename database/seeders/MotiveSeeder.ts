import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Motive from 'App/Models/Motive';

export default class extends BaseSeeder {
  public async run () {
    await Motive.createMany([
      {
        sapienciaId: 4,
        motive: "Expresa Voluntad",
      },
      {
        sapienciaId: 5,
        motive: "Incumplimiento Requisitos",
      },
      {
        sapienciaId: 6,
        motive: "No renovó el crédito",
      },
      {
        sapienciaId: 7,
        motive: "Motivos de Salud (Fuerza Mayor)",
      },
      {
        sapienciaId: 8,
        motive: "Motivos de Salud (No es Fuerza Mayor)",
      },
      {
        sapienciaId: 9,
        motive: "Anormalidad Académica",
      },
      {
        sapienciaId: 10,
        motive: "Matrícula Cero",
      },
      {
        sapienciaId: 11,
        motive: "Beca",
      },
      {
        sapienciaId: 12,
        motive: "Prácticas, Pasantía, Intercambios",
      },
      {
        sapienciaId: 13,
        motive: "Servicio Militar",
      },
      {
        sapienciaId: 14,
        motive: "Otro",
      },
      {
        sapienciaId: 17,
        motive: "Renuncia por Expresa Voluntad",
      },
      {
        sapienciaId: 22,
        motive: "Obtiene grado",
      },
      {
        sapienciaId: 25,
        motive: "No presentación de Documentos",
      },
    ]);
  }
}
