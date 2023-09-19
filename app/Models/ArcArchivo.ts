import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ArcArchivo extends BaseModel {

  public static table = 'ARC_ARCHIVO';

  @column({ isPrimary: true, columnName:'ARC_CODIGO' })
  public arc_codigo: number;

  @column({columnName:'ARC_NOMBRE', serializeAs:'arc_nombre'})
  public arc_nombre: string;

  @column({columnName:'ARC_ACTIVO', serializeAs:'arc_activo'})
  public arc_activo: boolean;

}
