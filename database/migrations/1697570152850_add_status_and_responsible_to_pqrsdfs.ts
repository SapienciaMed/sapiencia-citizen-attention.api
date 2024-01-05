import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PQR_PQRSDF";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("PQR_CODLEP_LISTADO_ESTADO_PQRSDF")
        .unsigned()
        .references("LEP_LISTADO_ESTADO_PQRSDF.LEP_CODIGO")
        .comment("llave foranea de la tabla estado pqrsdf(FK_LEP_CODIGO)")
        .defaultTo(1);
      table
        .integer("PQR_CODENT_ENTIDAD_TRABAJO")
        .unsigned()
        .references("ENT_ENTIDAD_TRABAJO.ENT_CODIGO")
        .comment("Llave foranea a la tabla entidad de trabajo(FK_ENT_CODIGO)")
        .nullable()
        .defaultTo(null)
    });
  }

  public async down() {
    /* this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign("PQR_CODLEP_LISTADO_ESTADO_PQRSDF");
      table.dropForeign("PQR_CODENT_ENTIDAD_TRABAJO");
      table.dropIndex("PQR_CODLEP_LISTADO_ESTADO_PQRSDF");
      table.dropIndex("PQR_CODENT_ENTIDAD_TRABAJO");
      table.dropColumn("PQR_CODLEP_LISTADO_ESTADO_PQRSDF");
      table.dropColumn("PQR_CODENT_ENTIDAD_TRABAJO");
    }); */
  }
}
