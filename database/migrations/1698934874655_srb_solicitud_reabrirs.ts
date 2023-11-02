import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'SRB_SOLICITUD_REABRIR'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      
      table
        .increments('SRB_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .text('SRB_JUSTIFICACION')
        .notNullable()
        .comment('Descripción o justificacion del porque de la reapertura del PQRSDF');

      table
        .boolean('SBR_ESTADO')
        .notNullable()
        .defaultTo(false)
        .comment('Bandera que permite determinar si una pqrsdf esta abierta o cerrada');

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
