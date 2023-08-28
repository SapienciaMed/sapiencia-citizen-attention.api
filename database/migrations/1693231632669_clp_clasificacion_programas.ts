import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CLP_CLASIFICACION_PROGRAMA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('CLP_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .text('CLP_DESCRIPCION')
        .notNullable();

      table
        .integer('CLP_PROGRAMA')
        .notNullable();

      table
        .boolean('CLP_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('CLP_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
