import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PDI_PARAMETRIZACION_DIAS";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("PDI_CODIGO");
      table.integer("PDI_ANO", 4).unsigned().unique();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("PDI_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("PDI_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
