import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRG_PROGRAMAS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table
      .increments('PRG_CODIGO')
      .primary()
      .notNullable()
      .comment('llave primaria');

    table
      .text('PRG_DESCRIPCION')
      .notNullable();

    table
      .integer('PRG_CLASIFICACION')
      .unsigned()
      .references('CLP_CODIGO')
      .inTable('CLP_CLASIFICACION_PROGRAMA')
      .comment('llave foranea de la tabla clasificacion_programas(FK)');

    table
      .integer('PRG_DEPENDENCIA')
      .unsigned()
      .references('DEP_CODIGO')
      .inTable('DEP_DEPENDENCIA')
      .comment('llave foranea de la tabla dependencia(FK)');

    table
      .boolean('PRG_ACTIVO')
      .notNullable()
      .defaultTo(true);

    table
      .integer('PRG_ORDEN').notNullable();

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
