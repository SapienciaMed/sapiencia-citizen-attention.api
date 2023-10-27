import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TAS_TIPO_ASUNTO_SOLICITUD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("TAS_CODIGO").primary().notNullable().comment("llave primaria");

      table.string("TAS_NOMBRE", 100).notNullable();

      table.boolean("TAS_ACTIVO").notNullable().defaultTo(true);

      table
        .integer("TAS_OBJECTO_SOLICITUD")
        .unsigned()
        .references("OBS_CODIGO")
        .inTable("OBS_OBJECTO_SOLICITUD")
        .comment("llave foranea de la tabla objecto solicitud(FK)");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("TAS_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("TAS_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
