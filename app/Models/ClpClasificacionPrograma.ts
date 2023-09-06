import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClpClasificacionPrograma extends BaseModel {

  public static table = 'CLP_CLASIFICACION_PROGRAMA';

  @column({ isPrimary: true, columnName:'CLP_CODIGO' })
  public clp_codigo: number

  @column({ columnName:'CLP_DESCRIPCION', serializeAs:'clp_descripcion' })
  public clp_descripcion: string;

  @column({ columnName:'CLP_PROGRAMA', serializeAs:'clp_programa' })
  public clp_programa: number;

  @column({ columnName: 'CLP_ACTIVO', serializeAs:'clp_activo'} )
  public clp_activo: boolean;

  @column({ columnName:'CLP_ORDEN', serializeAs:'clp_orden' })
  public clp_orden: number;

}
