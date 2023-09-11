import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PDD_PARAMETRIZACION_DIAS_DETALLE";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("PDD_CODIGO");
      table
        .integer("PDD_CODPDI_DIAS")
        .unsigned().references("PDI_PARAMETRIZACION_DIAS.PDI_CODIGO")
        .comment("Código del año (FK PDD_CODPDI_DIAS)");
      table
        .integer("PDD_CODTDI_DIA")
        .unsigned().references("TDI_TIPO_DIA.TDI_CODIGO")
        .comment("Código del tipo de dia (FK PDD_CODTDI_DIA)");
      table.text('PDD_DESCRIPCION').nullable()
      table.date("PDD_FECHA");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("PDD_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("PDD_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
