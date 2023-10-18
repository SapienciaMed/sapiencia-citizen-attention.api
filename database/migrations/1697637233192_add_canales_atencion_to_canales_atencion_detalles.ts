import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CAD_CANALES_ATENCION_DETALLE'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("CNA_CODCAD_CANALES_ATENCION")
        .unsigned()
        .references("CNA_CODIGO")
        .inTable("CNA_CANALES_ATENCION")
        .comment("llave foranea de la tabla canales de atencion (FK_CNA_CODIGO)")
        .nullable();


    })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
