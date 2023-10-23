import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class AttentionRequestType extends BaseModel {
  public static table = "TSA_TIPO_SOLICITUD_ATENCION";

  @column({ isPrimary: true, columnName: "TSA_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "TSA_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "TSA_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;

  @column({ columnName: "TSA_ORDEN", serializeAs: "order" })
  public order: number;
}
