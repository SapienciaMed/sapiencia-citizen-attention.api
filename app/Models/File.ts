import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class File extends BaseModel {
  public static table = "ARC_ARCHIVO";

  @column({ isPrimary: true, columnName: "ARC_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ARC_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "ARC_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;
}
