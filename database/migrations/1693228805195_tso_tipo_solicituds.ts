import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TSO_TIPO_SOLICITUD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('TSO_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('TSO_DESCRIPTION',100)
        .notNullable();

      table
        .boolean('TSO_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('TSO_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
