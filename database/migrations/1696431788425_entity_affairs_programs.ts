import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "EPA_ENTIDAD_PROGRAMA_ASUNTO";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("EPA_CODIGO");
      table
        .integer("EPA_CODENT_ENTIDAD_TRABAJO")
        .unsigned()
        .references("ENT_ENTIDAD_TRABAJO.ENT_CODIGO")
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment("Llave foranea a la tabla entidad de trabajo(FK_ENT_CODIGO)");
      table
        .integer("EPA_CODPRA_PROGRAMA_ASUNTO")
        .unsigned()
        .references("PRA_PROGRAMA_ASUNTOS.PRA_CODIGO")
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment("Llave foranea a la tabla programa asuntos(FK_PRA_CODIGO)");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("EPA_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("EPA_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
