import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import UserType from "./UserType";

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

  @hasMany(() => UserType, {
    localKey: "id",
    foreignKey: "valueGroupId",
  })
  public userTypes: HasMany<typeof UserType>;
}
