import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ASO_ASUNTO_SOLICITUD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('ASO_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('ASO_ASUNTO',100)
        .notNullable();

      table
        .integer('ASO_DIAS_HABILES')
        .notNullable();

      table
        .boolean('ASO_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('ASO_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
