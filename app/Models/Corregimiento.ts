import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Corregimiento extends BaseModel {
  public static table = "CRG_COMUNAS_CORREGIMIENTOS";

  @column({ isPrimary: true, columnName: "CRG_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "CRG_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "CRG_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;

  @column({ columnName: "CRG_ORDEN", serializeAs: "order" })
  public order: number;
}
