import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "SEM_SEMAFORO_DIAS_PQRSDF";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla para configurar los colores del semáforo");
      table.increments("SEM_CODIGO").primary().notNullable().comment("llave primaria");

      table.integer("SEM_DIA_INICIAL").notNullable();
      table.integer("SEM_DIA_FINAL").notNullable();

      table.string("SEM_ID_COLOR", 20).notNullable();

      table.boolean("SEM_ACTIVO").notNullable().defaultTo(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
