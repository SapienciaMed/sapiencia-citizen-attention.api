import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MreMedioRespuesta extends BaseModel {

  public static table = 'MRE_MEDIO_RESPUESTA';

  @column({ isPrimary: true, columnName:'MRE_CODIGO' })
  public mre_codigo: number;

  @column({ columnName:'MRE_DESCRIPCION', serializeAs:'mre_descripcion' })
  public mre_descripcion: string;

  @column({ columnName:'MRE_ACTIVO', serializeAs:'mre_activo' })
  public mre_activo: boolean;

  @column({ columnName:'MRE_ORDEN', serializeAs:'mre_orden'})
  public mre_orden: number;

}
