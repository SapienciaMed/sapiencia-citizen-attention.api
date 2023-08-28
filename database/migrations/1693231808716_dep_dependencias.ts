import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'DEP_DEPENDENCIA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
   
      table
        .increments('DEP_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('DEP_DESCRIPCION',100)
        .notNullable();

      table
        .boolean('DEP_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('DEP_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
