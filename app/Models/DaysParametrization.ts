import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import DaysParametrizationDetail from "./DaysParametrizationDetail";

export default class DaysParametrization extends BaseModel {
  public static table = "PDI_PARAMETRIZACION_DIAS";

  @column({ isPrimary: true, columnName: "PDI_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PDI_ANO", serializeAs: "year" })
  public year: number;

  @hasMany(() => DaysParametrizationDetail, {
    localKey: "id",
    foreignKey: "daysParametrizationId",
  })
  public daysParametrizationDetails: HasMany<typeof DaysParametrizationDetail>;

  @column.dateTime({
    autoCreate: true,
    columnName: "PDI_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "PDI_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
