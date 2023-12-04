import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Motive extends BaseModel {
  public static table = "MOV_MOTIVOS";

  @column({ isPrimary: true, columnName: "MOV_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "MOV_CODIGO_SAPIENCIA", serializeAs: "sapienciaId" })
  public sapienciaId: number;

  @column({ columnName: "MOV_MOTIVO", serializeAs: "motive" })
  public motive: string;

  @column({ columnName: "MOV_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;
}
