import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ASO_ASUNTO_SOLICITUD'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("ASO_CODEBE_ESTADO")
        .nullable()
        .unsigned().references("EBE_ESTADOS_BENEFICIARIO.EBE_CODIGO")
        .comment("Código de estado de beneficiario (FK ASO_CODEBE_ESTADO)");
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, () => {
    })
  }
}
