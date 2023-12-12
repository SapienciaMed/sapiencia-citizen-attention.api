import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PER_PERSONAS";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("PER_RAZON_SOCIAL", 200).nullable().defaultTo(null).after("PER_SEGUNDO_APELLIDO");
      table.setNullable("PER_NUMERO_CONTACTO_PRIMARIO");
      table.setNullable("PER_PRIMER_NOMBRE");
      table.setNullable("PER_PRIMER_APELLIDO");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {});
  }
}
