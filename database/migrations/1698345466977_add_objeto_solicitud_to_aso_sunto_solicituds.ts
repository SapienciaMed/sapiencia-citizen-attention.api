import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ASO_ASUNTO_SOLICITUD";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("ASO_CODOBS_OBJETO_SOLICITUD")
        .unsigned()
        .references("OBS_CODIGO")
        .inTable("OBS_OBJECTO_SOLICITUD")
        .comment("llave foranea de la tabla objeto de solicitud (FK_ASO_CODIGO)")
        .nullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("ASO_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("ASO_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    //this.schema.dropTable(this.tableName)
  }
}
