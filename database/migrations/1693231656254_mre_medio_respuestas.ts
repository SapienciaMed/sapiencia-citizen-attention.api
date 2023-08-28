import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'MRE_MEDIO_RESPUESTA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('MRE_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('MRE_DESCRIPCION',100)
        .notNullable();

      table
        .boolean('MRE_ACTIVO')
        .notNullable()
        .defaultTo(true);
      
      table
        .integer('MRE_ORDEN')
        .notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
