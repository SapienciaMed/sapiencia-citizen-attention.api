import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Factor extends BaseModel {
  public static table = "FAC_FACTORES";

  @column({ isPrimary: true, columnName: "FAC_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "FAC_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "FAC_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;

  @column({ columnName: "FAC_ORDEN", serializeAs: "order" })
  public order: number;
}
