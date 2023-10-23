import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import UserType from "App/Models/UserType";

export default class extends BaseSeeder {
  public async run() {
    await UserType.createMany([
      { id: 1, name: "Aspirantes", valueGroupId: 1, isActive: true, order: 1 },
      { id: 2, name: "Personas beneficiarias y ex beneficiarias", valueGroupId: 1, isActive: true, order: 2 },
      { id: 3, name: "Ciudadanía en general", valueGroupId: 1, isActive: true, order: 3 },
      { id: 4, name: "Juntas de Acción Comunal (JAC)", valueGroupId: 2, isActive: true, order: 1 },
      { id: 5, name: "Juntas Administradoras Locales (JAL)", valueGroupId: 2, isActive: true, order: 2 },
      {
        id: 6,
        name: "Concejo Comunal y Corregimental de Planeación (CCCP)",
        valueGroupId: 2,
        isActive: true,
        order: 3,
      },
      { id: 7, name: "Veedurías ciudadanas", valueGroupId: 2, isActive: true, order: 4 },
      { id: 8, name: "Líderes comunitarios", valueGroupId: 2, isActive: true, order: 5 },
      { id: 9, name: "Procuraduría Regional de Antioquia", valueGroupId: 3, isActive: true, order: 1 },
      { id: 10, name: "Contraloría General de Medellín", valueGroupId: 3, isActive: true, order: 2 },
      { id: 11, name: "Personería Medellín", valueGroupId: 3, isActive: true, order: 3 },
      { id: 12, name: "Fiscalía General de la Nación", valueGroupId: 3, isActive: true, order: 4 },
      { id: 13, name: "Conglomerado Público de la Alcaldía de Medellín", valueGroupId: 4, isActive: true, order: 1 },
      { id: 14, name: "Concejo de Medellín", valueGroupId: 4, isActive: true, order: 2 },
      { id: 15, name: "Entidades del Gobierno Nacional y Territorial", valueGroupId: 4, isActive: true, order: 3 },
      { id: 16, name: "Entidades Financieras", valueGroupId: 5, isActive: true, order: 1 },
      { id: 17, name: "IES del Distrito (ColMayor, Pascual Bravo e ITM)", valueGroupId: 5, isActive: true, order: 2 },
      { id: 18, name: "Entidades de cooperación", valueGroupId: 5, isActive: true, order: 3 },
      { id: 19, name: "Medios de comunicación", valueGroupId: 5, isActive: true, order: 4 },
      { id: 20, name: "Instituciones de Educación Superior", valueGroupId: 6, isActive: true, order: 1 },
      {
        id: 21,
        name: "Instituciones de Educación para el Trabajo y el Desarrollo Humano (ETDH)",
        valueGroupId: 6,
        isActive: true,
        order: 2,
      },
      { id: 22, name: "Instituciones de Educación Básica y Media", valueGroupId: 6, isActive: true, order: 3 },
      { id: 23, name: "Núcleos Educativos", valueGroupId: 6, isActive: true, order: 4 },
      { id: 24, name: "Observatorios", valueGroupId: 6, isActive: true, order: 5 },
      { id: 25, name: "Personal vinculado de Sapiencia", valueGroupId: 7, isActive: true, order: 1 },
      { id: 26, name: "Prestadores de servicios de Sapiencia", valueGroupId: 7, isActive: true, order: 2 },
      { id: 27, name: "Proveedores", valueGroupId: 7, isActive: true, order: 3 },
    ]);
  }
}
