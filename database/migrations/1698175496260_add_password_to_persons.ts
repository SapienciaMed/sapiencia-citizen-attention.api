import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PER_PERSONAS";

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('PER_CONTRASENA').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('PER_CONTRASENA')
    })
  }
}
