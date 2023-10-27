import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PQR_PQRSDF'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("PQR_CODPRG_PROGRAMA")
        .unsigned()
        .references("PRG_CODIGO")
        .inTable("PRG_PROGRAMAS")
        .comment("llave foranea de la tabla PQRSDF (FK_PROGRAMA)")
        .nullable();

    })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
