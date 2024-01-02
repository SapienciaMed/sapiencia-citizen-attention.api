import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PQR_PQRSDF";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("PQR_CODIGO").primary().notNullable().comment("llave primaria");

      table
        .integer("PQR_CODTSO_TIPO_SOLICITUD")
        .unsigned()
        .references("TSO_CODIGO")
        .inTable("TSO_TIPO_SOLICITUD")
        .notNullable()
        .comment("llave foranea a la tabla Tipo solucion(FK TSO_TIPO_SOLICITUD)");

      table
        .integer("PQR_CODPER_PERSONA")
        .unsigned()
        .references("PER_PERSONAS.PER_CODIGO")
        .comment("Llave forane a la tabla personas(FK PER_PERSONA)");

      table
        .integer("PQR_CODMRE_MRE_RESPUESTA")
        .unsigned()
        .references("MRE_CODIGO")
        .inTable("MRE_MEDIO_RESPUESTA")
        .notNullable()
        .comment("llave foranea a la tabla medios de respuestas (FK MRE_MEDIOS_RESPUESTAS");

      table
        .integer("PQR_CODASO_ASO_ASUNTO_SOLICITUD")
        .unsigned()
        .references("ASO_CODIGO")
        .inTable("ASO_ASUNTO_SOLICITUD")
        .notNullable()
        .comment("llave foranea a la tabla tipos de solicitud (FK TSO_TIPOS_SOLICITUD)");

      table.string("PQR_CLASIFICACION", 100).nullable();
      table.bigInteger("PQR_NRO_RADICADO");

      table.text("PQR_RESPUESTA").nullable();
      table.date("PQR_FECHA_RESPUESTA").nullable();

      table.string("PQR_DEPENDENCIA", 100).notNullable();

      table.text("PQR_DESCRIPCION").notNullable();

      table
        .integer("PQR_CODARC_ARCHIVO")
        .unsigned()
        .references("ARC_CODIGO")
        .inTable("ARC_ARCHIVO")
        .nullable()
        .comment("llave foranea a la tabla tipos de solicitud (FK ARC_ARCHIVO)");
      table
        .integer("PQR_CODPRG_PROGRAMA")
        .unsigned()
        .references("PRG_CODIGO")
        .inTable("PRG_PROGRAMAS")
        .comment("llave foranea de la tabla PQRSDF (FK_PROGRAMA)")
        .nullable();
      table
        .integer("PQR_CODMOV_MOTIVO")
        .unsigned()
        .nullable()
        .references("MOV_MOTIVOS.MOV_CODIGO")
        .comment("Llave foranea a la tabla motivos(FK_MOV_CODIGO)");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("PQR_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("PQR_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
