import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TSA_TIPO_SOLICITUD_ATENCION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("TSA_CODIGO").primary().notNullable().comment("llave primaria");

      table.string("TSA_DESCRIPCION", 50).notNullable();

      table.boolean("TSA_ACTIVO").notNullable().defaultTo(true);

      table.integer("TSA_ORDEN").notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
