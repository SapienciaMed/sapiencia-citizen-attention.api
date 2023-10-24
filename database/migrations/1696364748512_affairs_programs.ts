import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PRA_PROGRAMA_ASUNTOS";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("PRA_CODIGO");
      table
        .integer("PRA_CODASO_ASUNTO_SOLICITUD")
        .unsigned()
        .references("ASO_ASUNTO_SOLICITUD.ASO_CODIGO")
        .comment("Llave foranea a la tabla asunto solicitud(FK_ASO_CODIGO)");
      table
        .integer("PRA_CODPRG_PROGRAMA")
        .unsigned()
        .references("PRG_PROGRAMAS.PRG_CODIGO")
        .comment("Llave foranea a la tabla programas(FK_PRG_CODIGO)");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("PRA_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("PRA_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
