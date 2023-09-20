import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "PER_PERSONAS";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("PER_CODIGO");
      table.string("PER_NUMERO_DOCUMENTO", 20);
      table
        .integer("PER_CODTDO_TIPO_DOCUMENTO")
        .unsigned()
        .comment("Llave foranea a la tabla tipo documento(FK TDO_TIPO_DOCUMENTO");
      table
        .integer("PER_CODTEN_TEN_TIPO_ENTIDAD")
        .unsigned()
        .references("TEJ_TIPO_ENTIDAD_JURIDICA.TEJ_CODIGO")
        .comment("Llave forane a la tabla tipo entidad(FK TEN_TIPO_ENTIDAD)");
      table.string("PER_PRIMER_NOMBRE", 30);
      table.string("PER_SEGUNDO_NOMBRE", 30).nullable();
      table.string("PER_PRIMER_APELLIDO", 30);
      table.string("PER_SEGUNDO_APELLIDO", 30).nullable();
      table.date("PER_FECHA_NACIMIENTO");
      table.string("PER_NUMERO_CONTACTO_PRIMARIO", 30);
      table.string("PER_NUMERO_CONTACTO_SECUNDARIO", 30).nullable();
      table.string("PER_CORREO_ELECTRONICO", 100);
      table.string("PER_DIRECCION_RESIDENCIA", 100);
      table.integer("PQR_CODPAI_PAIS").unsigned().comment("Código del país (FK PQR_CODPAI_PAIS)");
      table.integer("PQR_CODDEP_DEPARTAMENTO").unsigned().comment("Código del departamento (FK PQR_CODDEP_DEPARTAMENTO)");
      table.integer("PQR_CODMUN_MUNICIPIO").unsigned().comment("Código del municipio (FK PQR_CODMUN_MUNICIPIO)");

      table.boolean("PER_BENEFICIARIO").defaultTo(false);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("PER_FECHA_CREACION", { useTz: true }).defaultTo(this.now());
      table.timestamp("PER_FECHA_ACTUALIZACION", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
