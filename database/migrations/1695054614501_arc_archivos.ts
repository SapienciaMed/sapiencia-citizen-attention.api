import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ARC_ARCHIVO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table
        .increments('ARC_CODIGO')
        .primary()
        .notNullable()
        .comment('LLave primaria');

      table
        .string('ARC_NOMBRE')
        .notNullable();

      table
        .boolean('ARC_ACTIVO')
        .notNullable()
        .defaultTo(true)

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
