import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TET_TIPO_ENTIDAD_TRABAJO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('TET_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('TET_DESCRIPCION',100)
        .notNullable();

      table
        .boolean('TET_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('TET_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
