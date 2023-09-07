import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LEP_LISTADO_ESTADO_PQRSDF'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('LEP_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('LEP_ESTADO',30)
        .notNullable();

      table
        .boolean('LEP_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('LEP_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
