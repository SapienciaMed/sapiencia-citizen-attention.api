import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PQR_PQRSDF'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("PQR_CODMOV_MOTIVO")
        .unsigned()
        .nullable()
        .references("MOV_MOTIVOS.MOV_CODIGO")
        .after('PQR_CODPRG_PROGRAMA')
        .comment("Llave foranea a la tabla motivos(FK_MOV_CODIGO)");
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
    })
  }
}
