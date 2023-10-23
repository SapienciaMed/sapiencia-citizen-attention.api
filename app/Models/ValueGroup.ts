import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ValueGroup extends BaseModel {
  public static table = "GVA_GRUPOS_VALOR";

  @column({ isPrimary: true, columnName: "GVA_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "GVA_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "GVA_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;

  @column({ columnName: "GVA_ORDEN", serializeAs: "order" })
  public order: number;
}
