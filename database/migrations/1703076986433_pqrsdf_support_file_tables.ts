import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ARP_ARCHIVO_APOYO_PQRSDF";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("ARP_CODIGO");
      table
        .integer("ARP_CODPQR_PQRSDF")
        .unsigned()
        .references("PQR_PQRSDF.PQR_CODIGO")
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment("Llave foranea a la tabla pqrsdf(FK_PQR_CODIGO)");
      table
        .integer("ARP_CODARC_ARCHVIO")
        .unsigned()
        .references("ARC_ARCHIVO.ARC_CODIGO")
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .comment("Llave foranea a la tabla archivos(FK_ARC_CODIGO)");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("ARP_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("ARP_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
