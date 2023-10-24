import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "TRP_TIPOS_RESPUESTA ";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("TRP_CODIGO").primary().notNullable().comment("llave primaria");

      table.string("TRP_DESCRIPCION", 50).notNullable();

      table.boolean("TRP_ACTIVO").notNullable().defaultTo(true);

      table.integer("TRP_ORDEN").notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
