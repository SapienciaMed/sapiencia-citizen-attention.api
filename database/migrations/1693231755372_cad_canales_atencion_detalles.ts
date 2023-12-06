import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CAD_CANALES_ATENCION_DETALLE'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table
        .increments('CAD_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('CAD_NOMBRE',50)
        .notNullable();

      table
        .boolean('CAD_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('CAD_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
