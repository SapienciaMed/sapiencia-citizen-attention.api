import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PqrsdfResponse extends BaseModel {
  public static table = "RPF_RESPUESTA_PQRSDF";

  @column({ isPrimary: true, columnName: "RPF_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "RPF_NRO_RADICADO", serializeAs: "filingNumber" })
  public filingNumber: number;

  @column({ columnName: "RPF_PETICIONARIO", serializeAs: "isPetitioner" })
  public isPetitioner: boolean;

  @column({ columnName: "RPF_CODPQR_PQRSDF", serializeAs: "pqrsdfId" })
  public pqrsdfId: number;

  @column({ columnName: "RPF_CODTRP_TIPORES", serializeAs: "responseTypeId" })
  public responseTypeId: number;

  @column({ columnName: "RPF_CODTET_TIPOENT", serializeAs: "workEntityTypeId" })
  public workEntityTypeId: number;

  @column({ columnName: "RPF_CODFAC_FACTOR", serializeAs: "factorId" })
  public factorId: number;

  @column({ columnName: "RPF_CODARC_ARCHIVO", serializeAs: "fileId" })
  public fileId: number;

  @column({ columnName: "RPF_CODUSR_USUARIOASI", serializeAs: "assignedUserId" })
  public assignedUserId: number;

  @column({ columnName: "RPF_CODUSR_USUARIORES", serializeAs: "respondingUserId" })
  public respondingUserId: number;

  @column({ columnName: "RPF_OBSERVACION", serializeAs: "observation" })
  public observation: string;

  @column.dateTime({
    autoCreate: true,
    columnName: "RPF_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "RPF_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
