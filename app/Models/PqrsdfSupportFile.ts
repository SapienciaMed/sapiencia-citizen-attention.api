import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pqrsdf from './Pqrsdf';
import File from './File';

export default class PqrsdfSupportFile extends BaseModel {
  public static table = "ARP_ARCHIVO_APOYO_PQRSDF";

  @column({ isPrimary: true, columnName: "ARP_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ARP_CODPQR_PQRSDF", serializeAs: "pqrsdfId" })
  public pqrsdfId: number;

  @column({ columnName: "ARP_CODARC_ARCHVIO", serializeAs: "fileId" })
  public fileId: number;

  @belongsTo(() => Pqrsdf, {
    localKey: "id",
    foreignKey: "pqrsdfId",
  })
  public pqrsdf: BelongsTo<typeof Pqrsdf>;

  @belongsTo(() => File, {
    localKey: "id",
    foreignKey: "fileId",
  })
  public file: BelongsTo<typeof File>;

  @column.dateTime({
    autoCreate: true,
    columnName: "ARP_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "ARP_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
