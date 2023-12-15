import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "RPF_RESPUESTA_PQRSDF";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("RPF_CODIGO");
      table.bigInteger("RPF_NRO_RADICADO").nullable();
      table.boolean("RPF_PETICIONARIO").defaultTo(false);
      table
        .integer("RPF_CODPQR_PQRSDF")
        .unsigned()
        .references("PQR_CODIGO")
        .inTable("PQR_PQRSDF")
        .notNullable()
        .comment("llave foranea a la PQRSDF (FK PQR_PQRSDF)");
      table
        .integer("RPF_CODTRP_TIPORES")
        .unsigned()
        .references("TRP_CODIGO")
        .inTable("TRP_TIPOS_RESPUESTA")
        .notNullable()
        .comment("llave foranea a la tabla tipos de solicitud (FK TRP_TIPORES)");
      table
        .integer("RPF_CODTET_TIPOENT")
        .unsigned()
        .references("TET_CODIGO")
        .inTable("TET_TIPO_ENTIDAD_TRABAJO")
        .nullable()
        .comment("llave foranea a la tabla tipos de solicitud (FK TET_TIPOENT)");
      table
        .integer("RPF_CODFAC_FACTOR")
        .unsigned()
        .references("FAC_CODIGO")
        .inTable("FAC_FACTORES")
        .nullable()
        .comment("llave foranea a la tabla factores (FK FAC_FACTOR)");
      table
        .integer("RPF_CODARC_ARCHIVO")
        .unsigned()
        .references("ARC_CODIGO")
        .inTable("ARC_ARCHIVO")
        .nullable()
        .comment("llave foranea a la tabla tipos de solicitud (FK ARC_ARCHIVO)");

      //Usuario asignado
      table
        .integer("RPF_CODUSR_USUARIOASI")
        .nullable()
        .unsigned()
        .comment("Este campo pertenece a la tabla usuarios, usuario asignado");
      table
        .integer("RPF_CODDEP_DEPENDECIAASI")
        .unsigned()
        .references("DEP_CODIGO")
        .inTable("DEP_DEPENDENCIA")
        .nullable()
        .comment("llave foranea a la tabla dependencias (FK DEP_DEPENDECIAASI)");

      //Usuario responde
      table
        .integer("RPF_CODUSR_USUARIORES")
        .unsigned()
        .comment("Este campo pertenece a la tabla usuarios, usuario que responde");

      table
        .integer("RPF_CODDEP_DEPENDECIARES")
        .unsigned()
        .references("DEP_CODIGO")
        .inTable("DEP_DEPENDENCIA")
        .nullable()
        .comment("llave foranea a la tabla dependencias (FK DEP_DEPENDECIARES)");

      table.text("RPF_OBSERVACION", "longtext");

      table
        .integer("RPF_CODENT_ENTIDAD_TRABAJO")
        .unsigned()
        .nullable()
        .references("ENT_ENTIDAD_TRABAJO.ENT_CODIGO")
        .onUpdate('CASCADE')
        .comment("Llave foranea a la tabla entidad de trabajo(FK_ENT_CODIGO)");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("RPF_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("RPF_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
