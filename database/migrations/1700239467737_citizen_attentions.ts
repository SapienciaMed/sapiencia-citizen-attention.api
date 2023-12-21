import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ACI_ATENCION_CIUDADANA";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("ACI_CODIGO");
      //PERSONA
      table.string("ACI_NUMERO_DOCUMENTO", 20);
      table
        .integer("ACI_CODTDO_TIPO_DOCUMENTO")
        .unsigned()
        .comment("Llave foranea a la tabla tipo documento(FK TDO_TIPO_DOCUMENTO");
      table.string("ACI_RAZON_SOCIAL", 200).nullable();
      table.string("ACI_PRIMER_NOMBRE", 50).nullable();
      table.string("ACI_SEGUNDO_NOMBRE", 50).nullable();
      table.string("ACI_PRIMER_APELLIDO", 50).nullable();
      table.string("ACI_SEGUNDO_APELLIDO", 50).nullable();
      table.string("ACI_NUMERO_CONTACTO_PRIMARIO", 30);
      table.string("ACI_NUMERO_CONTACTO_SECUNDARIO", 30).nullable();
      table.string("ACI_CORREO", 150).nullable();

      table
        .integer("ACI_CODEST_ESTRATO")
        .nullable()
        .unsigned()
        .comment("Llave foranea a la tabla maestra estrato(FK EST_ESTRATO");
      //ATENCION
      table
        .integer("ACI_CODCAD_CANAL_DETALLE")
        .unsigned()
        .references("CAD_CODIGO")
        .inTable("CAD_CANALES_ATENCION_DETALLE")
        .comment("Llave foranea a la tabla canales de atención detalle (FK_CAD_CANALES_ATENCION_DETALLE");
      table
        .integer("ACI_CODTSA_TIPO_SOLICITUD")
        .unsigned()
        .references("TSA_CODIGO")
        .inTable("TSA_TIPO_SOLICITUD_ATENCION")
        .comment("Llave foranea a la tabla tipos solicitud atencion (FK_TSA_TIPO_SOLICITUD_ATENCION");
      table
        .integer("ACI_CODDEP_DEPENDENCIA")
        .unsigned()
        .references("DEP_CODIGO")
        .inTable("DEP_DEPENDENCIA")
        .comment("Llave foranea a la tabla dependencias (FK_DEP_DEPENDENCIA");
      table
        .integer("ACI_CODPRG_PROGRAMA")
        .unsigned()
        .references("PRG_CODIGO")
        .inTable("PRG_PROGRAMAS")
        .comment("Llave foranea a la tabla programas (FK_PRG_PROGRAMAS");
      table
        .integer("ACI_CODASO_ASUNTO")
        .unsigned()
        .references("ASO_CODIGO")
        .inTable("ASO_ASUNTO_SOLICITUD")
        .comment("Llave foranea a la tabla asunto solicitud (FK_ASO_ASUNTO_SOLICITUD");
      table
        .integer("ACI_CODCRG_COMUNAS")
        .unsigned()
        .nullable()
        .references("CRG_CODIGO")
        .inTable("CRG_COMUNAS_CORREGIMIENTOS")
        .comment("Llave foranea a la tabla comunas corregimientos (FK_CRG_COMUNAS_CORREGIMIENTOS");
      table
        .integer("ACI_TIPO_USUARIO")
        .unsigned()
        .nullable()
        .references("TUS_CODIGO")
        .inTable("TUS_TIPO_USUARIO")
        .comment("Llave foranea a la tabla tipos de usuarios (FK_TUS_TIPO_USUARIO");
      table.text("ACI_OBSERVACION", "longtext");

      table.integer("USUARIO_CREA").unsigned().comment("Llave foranea al usuario(FK USUARIO_CREA");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("ACI_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("ACI_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
