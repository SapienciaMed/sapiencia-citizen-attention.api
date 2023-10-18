import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PQR_PQRSDF'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("PQR_CODCAD_CANALES_ATENCION_DETALLE_PQRSDF")
        .unsigned()
        .references("CAD_CODIGO")
        .inTable("CAD_CANALES_ATENCION_DETALLE")
        .comment("llave foranea de la tabla canales de atencion pqrsdf(FK_CAD_CODIGO)")
        .nullable();
    })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
