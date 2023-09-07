import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AsoAsuntoSolicitud extends BaseModel {
  
  public static table = 'ASO_ASUNTO_SOLICITUD';

  @column({ isPrimary: true, columnName:'ASO_CODIGO' })
  public aso_codigo: number;

  @column({ columnName:'ASO_ASUNTO', serializeAs:'aso_asunto' })
  public aso_asunto: string;

  @column({ columnName:'ASO_DIAS_HABILES', serializeAs:'aso_dias_habiles' })
  public aso_dias_habiles: number;

  @column({ columnName:'ASO_ACTIVO', serializeAs:'aso_activo' })
  public aso_activo: boolean;

  @column({ columnName:'ASO_ORDEN', serializeAs:'aso_orden' })
  public aso_orden: number;

}
