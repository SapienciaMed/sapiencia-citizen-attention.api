import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Business extends BaseModel {
  public static table = "PDI_PARAMETRIZACION_DIAS";

  @column({ isPrimary: true, columnName: "TRA_CODIGO", serializeAs: "id" })
  public id: number;
}
