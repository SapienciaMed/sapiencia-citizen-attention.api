import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import TdiTipoDia from "./TdiTipoDia";

export default class DaysParametrizationDetail extends BaseModel {
  public static table = "PDD_PARAMETRIZACION_DIAS_DETALLE";

  @column({ isPrimary: true, columnName: "PDD_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PDD_CODPDI_DIAS", serializeAs: "daysParametrizationId" })
  public daysParametrizationId: number;

  @column({ columnName: "PDD_CODTDI_DIA", serializeAs: "dayTypeId" })
  public dayTypeId: number;
  
  @column({ columnName: "PDD_DESCRIPCION", serializeAs: "description" })
  public description: string|null;

  @belongsTo(() => TdiTipoDia, {
    localKey: "tdi_codigo",
    foreignKey: "dayTypeId",
  })
  public dayType: BelongsTo<typeof TdiTipoDia>;

  @column.date({ columnName: "PDD_FECHA", serializeAs: "detailDate" })
  public detailDate: DateTime;

  @column.dateTime({
    autoCreate: true,
    columnName: "PDD_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "PDD_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
