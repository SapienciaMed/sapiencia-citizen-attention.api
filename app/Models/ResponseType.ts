import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ResponseType extends BaseModel {
  public static table = "TRP_TIPOS_RESPUESTA";

  @column({ isPrimary: true, columnName: "TRP_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "TRP_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "TRP_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;

  @column({ columnName: "TRP_ORDEN", serializeAs: "order" })
  public order: number;
}
