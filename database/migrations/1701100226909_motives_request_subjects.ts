import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'AMO_ASUNTOS_MOTIVOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("AMO_CODIGO");
      table
        .integer("AMO_CODASO_ASUNTO_SOLICITUD")
        .unsigned()
        .references("ASO_ASUNTO_SOLICITUD.ASO_CODIGO")
        .comment("Llave foranea a la tabla asunto solicitud(FK_ASO_CODIGO)");
      table
        .integer("AMO_CODMOV_MOTIVO")
        .unsigned()
        .references("MOV_MOTIVOS.MOV_CODIGO")
        .comment("Llave foranea a la tabla motivos(FK_MOV_CODIGO)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
