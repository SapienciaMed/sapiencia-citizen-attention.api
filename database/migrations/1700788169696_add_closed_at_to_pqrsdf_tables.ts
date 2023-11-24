import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PQR_PQRSDF'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('PQR_FECHA_CIERRE',{useTz:true}).nullable()
    })
  }

  public async down () {
    /* this.schema.alterTable(this.tableName, (table) => {
    }) */
  }
}
