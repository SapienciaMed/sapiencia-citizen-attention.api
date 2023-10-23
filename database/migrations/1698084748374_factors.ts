import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'FAC_FACTORES'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("FAC_CODIGO").primary().notNullable().comment("llave primaria");

      table.string("FAC_NOMBRE", 50).notNullable();

      table.boolean("FAC_ACTIVO").notNullable().defaultTo(true);

      table.integer("FAC_ORDEN").notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
