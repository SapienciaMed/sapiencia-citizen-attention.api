import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TDI_TIPO_DIA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('TDI_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('TDI_DESCRIPCION',100)
        .notNullable();

      table
        .boolean('TDI_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('TDI_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
