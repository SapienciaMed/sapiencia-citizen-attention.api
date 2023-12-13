import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PQR_PQRSDF";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date("PQR_FECHA_PRORROGA").after("PQR_FECHA_RESPUESTA").nullable().defaultTo(null);
    });
  }

  public async down() {
    /* this.schema.alterTable(this.tableName, (table) => {
    }) */
  }
}
