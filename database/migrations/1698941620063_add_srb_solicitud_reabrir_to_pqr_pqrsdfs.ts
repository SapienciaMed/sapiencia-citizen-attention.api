import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PQR_PQRSDF'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
      .integer("PQR_CODSRB_SRB_SOLICITU_REABRIR")
      .unsigned()
      .references("SRB_CODIGO")
      .inTable("SRB_SOLICITUD_REABRIR")
      .comment("llave foranea de la tabla PQRSDF (FK_PQR_CODPRG_PROGRAMA)")
      .nullable();

  })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
