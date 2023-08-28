import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LPA_LISTA_PARAMETROS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('LPA_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria')

      table
        .text('LPA_DESCRIPCION')
        .notNullable();

      table
        .text('LPA_VALOR')
        .notNullable();

      table
        .integer('LPA_ID_APLICATIVO')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
