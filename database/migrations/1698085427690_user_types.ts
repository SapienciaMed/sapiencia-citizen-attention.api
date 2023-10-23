import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "TUS_TIPO_USUARIO";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("TUS_CODIGO").primary().notNullable().comment("llave primaria");

      table.string("TUS_NOMBRE", 100).notNullable();

      table.boolean("TUS_ACTIVO").notNullable().defaultTo(true);

      table.integer("TUS_ORDEN").notNullable();

      table
        .integer("TUS_GRUPO_VALOR")
        .unsigned()
        .references("GVA_CODIGO")
        .inTable("GVA_GRUPOS_VALOR")
        .comment("llave foranea de la tabla grupo valor(FK)");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
