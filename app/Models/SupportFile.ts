import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import File from "./File";
import Pqrsdf from "./Pqrsdf";

export default class SupportFile extends BaseModel {
  public static table = "ARP_ARCHIVO_APOYO_PQRSDF";

  @column({ isPrimary: true, columnName: "ARP_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ARP_CODPQR_PQRSDF", serializeAs: "pqrsdfId" })
  public pqrsdfId: number;

  @column({ columnName: "ARP_CODARC_ARCHVIO", serializeAs: "fileId" })
  public fileId: number;

  @column({ columnName: "ARP_VISIBLE_PETICIONARIO", serializeAs: "visiblePetitioner" })
  public visiblePetitioner: boolean;

  @column({ columnName: "ARP_USUARIO_CREA", serializeAs: "userId" })
  public userId: number;

  @belongsTo(() => File, {
    localKey: "id",
    foreignKey: "fileId",
  })
  public file: BelongsTo<typeof File>;

  @belongsTo(() => Pqrsdf, {
    localKey: "id",
    foreignKey: "pqrsdfId",
  })
  public pqrsdf: BelongsTo<typeof Pqrsdf>;

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
