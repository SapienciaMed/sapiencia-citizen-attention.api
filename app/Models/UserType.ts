import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import ValueGroup from "./ValueGroup";

export default class UserType extends BaseModel {
  public static table = "TUS_TIPO_USUARIO";

  @column({ isPrimary: true, columnName: "TUS_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "TUS_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "TUS_GRUPO_VALOR", serializeAs: "valueGroupId" })
  public valueGroupId: number;

  @column({ columnName: "TUS_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;

  @column({ columnName: "TUS_ORDEN", serializeAs: "order" })
  public order: number;

  @belongsTo(() => ValueGroup, {
    localKey: "id",
    foreignKey: "valueGroupId",
  })
  public status: BelongsTo<typeof ValueGroup>;
}
