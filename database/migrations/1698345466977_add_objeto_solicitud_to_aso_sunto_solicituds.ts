import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ASO_ASUNTO_SOLICITUD'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("OBS_CODASO_OBJETO_SOLICITUD")
        .unsigned()
        .references("OBS_CODIGO")
        .inTable("OBS_OBJECTO_SOLICITUD")
        .comment("llave foranea de la tabla suntos solicitud (FK_ASO_CODIGO)")
        .nullable();
    })
  }

  public async down () {
    //this.schema.dropTable(this.tableName)
  }
}
