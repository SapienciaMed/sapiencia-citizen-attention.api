import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'EBE_ESTADOS_BENEFICIARIO';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("EBE_CODIGO").primary().notNullable().comment("llave primaria");
      table.bigInteger("EBE_CODIGO_SAPIENCIA").comment("llave primaria de sapiencia");

      table.string("EBE_ESTADO", 50).notNullable();

      table.boolean("EBE_ACTIVO").notNullable().defaultTo(true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
