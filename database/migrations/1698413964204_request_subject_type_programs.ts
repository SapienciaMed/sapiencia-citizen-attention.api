import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "TAP_TIPOS_ASUNTO_SOLICITUD_PROGRAMA";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("TAP_CODIGO").primary().notNullable().comment("llave primaria");

      table
        .integer("TAP_PROGRAMA")
        .unsigned()
        .references("PRG_CODIGO")
        .inTable("PRG_PROGRAMAS")
        .comment("llave foranea de la tabla programa(FK)");

      table
        .integer("TAP_TIPO_ASUNTO_SOLICITUD")
        .unsigned()
        .references("TAS_CODIGO")
        .inTable("TAS_TIPO_ASUNTO_SOLICITUD")
        .comment("llave foranea de la tabla tipo de asunto solicitud(FK)");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
