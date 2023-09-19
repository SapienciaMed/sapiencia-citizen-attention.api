import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PQR_PQRSDF'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table
        .increments('PQR_CODIGO')
        .primary()
        .notNullable()
        .comment('llave primaria');

      table
        .integer('PQR_CODTSO_TIPO_SOLICITUD')
        .unsigned()
        .references('TSO_CODIGO')
        .inTable('TSO_TIPO_SOLICITUD')
        .notNullable()
        .comment('llave foranea a la tabla Tipo solucion(FK TSO_TIPO_SOLICITUD)');

      table
        .string('PQR_CODTDO_TIPO_DOCUMENTO',50)
        .notNullable()
        .comment('Este campo pertenece a la tabla generica ubicada en Core-dev');
      
      table
        .string('PQR_NUMERO_DOCUMENTO',20)
        .notNullable()
      
      table
        .integer('PQR_CODTEN_TEJ_TIPO_ENTIDAD_JURIDICA')
        .unsigned()
        .references('TEJ_CODIGO')
        .inTable('TEJ_TIPO_ENTIDAD_JURIDICA')
        .notNullable()
        .comment('Llave forane a la tabla tipo entidad(FK TEJ_TIPO_ENTIDAD_JURIDICA)');
      
      table
        .string('PQR_PRIMER_NOMBRE',30)
        .notNullable()
        .comment('primer nombre');

      table
        .string('PQR_SEGUNDO_NOMBRE')
        .notNullable()
        .comment('segundo nombre')
      
      table
        .string('PQR_PRIMER_APELLIDO',30)
        .notNullable()
        .comment('primer apellido');

      table
        .string('PQR_SEGUNDO_APELLIDO',30)
        .notNullable()
        .comment('segundo apellido')
      
      table
        .string('PQR_FECHA_NACIMIENTO',30)
        .notNullable();
      
      table
        .string('PQR_NUMERO_CONTACTO_PRI',30)
        .notNullable();

      table
        .string('PQR_NUMERO_CONTACTO_SECUNDARIO',30)
        .notNullable()
      
      table
        .string('PQR_CORREO_ELECTRONICO',100)
        .notNullable();
      
      table
        .string('PQR_DIRECCION_RESIDENCIA',100)
        .notNullable();

      table
        .integer('PQR_PAIS')
        .notNullable()
        .comment('Este campo pertenece a la tabla generica ubicada en Core-dev');

      table
        .integer('PQR_DEPARTAMENTO')
        .notNullable()
        .comment('Este campo pertenece a la tabla generica ubicada en Core-dev');

      table
        .integer('PQR_MUNICIPIO')
        .notNullable()
        .comment('Este campo pertenece a la tabla generica ubicada en Core-dev');
    
      table
        .integer('PQR_CODMRE_MRE_RESPUESTA')
        .unsigned()
        .references('MRE_CODIGO')
        .inTable('MRE_MEDIO_RESPUESTA')
        .notNullable()
        .comment('llave foranea a la tabla medios de respuestas (FK MRE_MEDIOS_RESPUESTAS');

      table
        .integer('PQR_CODASO_ASO_ASUNTO_SOLICITUD')
        .unsigned()
        .references('ASO_CODIGO')
        .inTable('ASO_ASUNTO_SOLICITUD')
        .notNullable()
        .comment('llave foranea a la tabla tipos de solicitud (FK TSO_TIPOS_SOLICITUD)');

      table
        .string('PQR_CLASIFICACION',100)
        .notNullable();

      table
        .string('PQR_DEPENDENCIA',100)
        .notNullable();
      
      table
        .text('PQR_DESCRIPCION')
        .notNullable();

      table
        .integer('PQR_CODARC_ARCHIVO')
        .unsigned()
        .references('ARC_CODIGO')
        .inTable('ARC_ARCHIVO')
        .notNullable()
        .comment('llave foranea a la tabla tipos de solicitud (FK ARC_ARCHIVO)');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
