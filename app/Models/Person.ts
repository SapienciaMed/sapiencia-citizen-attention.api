import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import TejTipoEntidadJuridica from './TejTipoEntidadJuridica';

export default class Person extends BaseModel {
  public static table = "PER_PERSONAS";

  @column({ isPrimary: true, columnName: "PER_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PER_CODTDO_TIPO_DOCUMENTO", serializeAs: "documentTypeId" })
  public documentTypeId: number;

  @column({ columnName: "PER_CODTEN_TEN_TIPO_ENTIDAD", serializeAs: "entityTypeId" })
  public entityTypeId: number;

  @column({ columnName: "PER_NUMERO_DOCUMENTO", serializeAs: "identification" })
  public identification: string;

  @column({ columnName: "PER_PRIMER_NOMBRE", serializeAs: "firstName" })
  public firstName: string;

  @column({ columnName: "PER_SEGUNDO_NOMBRE", serializeAs: "secondName" })
  public secondName: string;

  @column({ columnName: "PER_PRIMER_APELLIDO", serializeAs: "firstSurname" })
  public firstSurname: string;

  @column({ columnName: "PER_SEGUNDO_APELLIDO", serializeAs: "secondSurname" })
  public secondSurname: string;

  @column({ columnName: "PER_FECHA_NACIMIENTO", serializeAs: "birthdate" })
  public birthdate: Date;

  @column({ columnName: "PER_NUMERO_CONTACTO_PRIMARIO", serializeAs: "firstContactNumber" })
  public firstContactNumber: string;

  @column({ columnName: "PER_NUMERO_CONTACTO_SECUNDARIO", serializeAs: "secondContactNumber" })
  public secondContactNumber: string;

  @column({ columnName: "PER_CORREO_ELECTRONICO", serializeAs: "email" })
  public email: string;

  @column({ columnName: "PER_DIRECCION_RESIDENCIA", serializeAs: "address" })
  public address: string;

  @column({ columnName: "PQR_CODPAI_PAIS", serializeAs: "countryId" })
  public countryId: number;

  @column({ columnName: "PQR_CODDEP_DEPARTAMENTO", serializeAs: "departmentId" })
  public departmentId: number;

  @column({ columnName: "PQR_CODMUN_MUNICIPIO", serializeAs: "municipalityId" })
  public municipalityId: number;

  @column({ columnName: "PER_BENEFICIARIO", serializeAs: "isBeneficiary" })
  public isBeneficiary: boolean;

  @belongsTo(() => TejTipoEntidadJuridica, {
    localKey: "tej_codigo",
    foreignKey: "entityTypeId",
  })
  public entityType: BelongsTo<typeof TejTipoEntidadJuridica>;

  @column.dateTime({
    autoCreate: true,
    columnName: "PER_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "PER_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
