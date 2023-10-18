import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "OBS_OBJECTO_SOLICITUD";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum("OBS_TIPO_DIAS", ["Hábiles", "Calendario"]).defaultTo("Hábiles");
      table.renameColumn("OBS_TERMINO_DIAS_HABILES","OBS_TERMINO_DIAS");
    });
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
