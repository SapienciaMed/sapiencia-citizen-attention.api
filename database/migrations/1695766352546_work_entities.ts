import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ENT_ENTIDAD_TRABAJO";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("ENT_CODIGO");
      table
        .integer("ENT_CODUSR_USUARIO")
        .unsigned()
        .comment("Este campo pertenece a la tabla usuarios ubicada en autenticacion-dev");
      table
        .integer("ENT_CODTET_TIPO_ENTIDAD_TRABAJO")
        .unsigned()
        .references("TET_TIPO_ENTIDAD_TRABAJO.TET_CODIGO")
        .comment("llave foranea de la tabla tipo de entidad(FK)");
      table.integer("ENT_ORDEN").notNullable();
      table.string("ENT_NOMBRE_ENTIDAD", 200).notNullable().comment("Nombre de la entidad de trabajo");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("ENT_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("ENT_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
