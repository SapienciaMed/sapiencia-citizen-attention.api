import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ASP_ASUNTO_SOLICITUD_PROGRAMA";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("ASP_CODIGO").primary().notNullable().comment("llave primaria");

      table
        .integer("ASP_PROGRAMA")
        .unsigned()
        .references("PRG_CODIGO")
        .inTable("PRG_PROGRAMAS")
        .comment("llave foranea de la tabla programa(FK)");

      table
        .integer("ASP_ASUNTO_SOLICITUD")
        .unsigned()
        .references("ASO_CODIGO")
        .inTable("ASO_ASUNTO_SOLICITUD")
        .withKeyName("FK_ASO_ASUNTO_SOLICITUD")
        .comment("llave foranea de la tabla tipo de asunto solicitud(FK)");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
