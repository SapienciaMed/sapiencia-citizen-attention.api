import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'OBS_OBJECTO_SOLICITUD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table
        .increments('OBS_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .string('OBS_DESCRIPCION',100).notNullable();

      table
        .integer('OBS_TERMINO_DIAS_HABILES').notNullable();

      table
        .boolean('OBS_ACTIVO')
        .notNullable()
        .defaultTo(true);

      table
        .integer('OBS_ORDEN').notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
