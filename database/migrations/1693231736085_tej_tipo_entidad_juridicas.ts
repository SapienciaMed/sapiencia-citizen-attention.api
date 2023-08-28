import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TEJ_TIPO_ENTIDAD_JURIDICA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('TEJ_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('TEJ_NOMBRE',100)
        .notNullable();

      table
        .boolean('TEJ_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('TEJ_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
