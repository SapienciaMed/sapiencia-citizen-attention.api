import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'MOV_MOTIVOS';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("MOV_CODIGO").primary().notNullable().comment("llave primaria");
      table.bigInteger("MOV_CODIGO_SAPIENCIA").comment("llave primaria de sapiencia");

      table.string("MOV_MOTIVO", 50).notNullable();

      table.boolean("MOV_ACTIVO").notNullable().defaultTo(true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
