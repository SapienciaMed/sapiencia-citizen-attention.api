import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CRG_COMUNAS_CORREGIMIENTOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("CRG_CODIGO").primary().notNullable().comment("llave primaria");

      table.string("CRG_NOMBRE", 50).notNullable();

      table.boolean("CRG_ACTIVO").notNullable().defaultTo(true);

      table.integer("CRG_ORDEN").notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
