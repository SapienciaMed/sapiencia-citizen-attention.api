import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LepListadoEstadoPqrsdf extends BaseModel {
  
  public static table = 'LEP_LISTADO_ESTADO_PQRSDF';

  @column({ isPrimary: true, columnName:'LEP_CODIGO' })
  public lep_codigo: number;

  @column({ columnName:'LEP_ESTADO', serializeAs:'lep_estado'})
  public lep_estado: string;

  @column({ columnName:'LEP_ACTIVO', serializeAs:'lep_activo' })
  public lep_activo: boolean;

  @column({ columnName:'LEP_ORDEN', serializeAs:'lep_orden'})
  public lep_orden: number;

}
