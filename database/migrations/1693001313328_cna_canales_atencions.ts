import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CNA_CANALES_ATENCION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table
        .increments('CNA_CODIGO')
        .primary()
        .notNullable()
        .comment('LLave primaria');

      table
        .string('CNA_CANAL',50)
        .notNullable();

      table
        .boolean('CNA_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('CNA_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
