import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'GVA_GRUPOS_VALOR'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("GVA_CODIGO").primary().notNullable().comment("llave primaria");

      table.string("GVA_NOMBRE", 50).notNullable();

      table.boolean("GVA_ACTIVO").notNullable().defaultTo(true);

      table.integer("GVA_ORDEN").notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
