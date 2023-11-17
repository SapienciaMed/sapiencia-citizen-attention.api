import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class CadCanalesAtencionDetalle extends BaseModel {

  public static table = 'CAD_CANALES_ATENCION_DETALLE';

  @column({ isPrimary: true, columnName:'CAD_CODIGO' })
  public cad_codigo: number;

  @column({ columnName:'CAD_NOMBRE', serializeAs:'cad_nombre' })
  public cad_nombre: string;

  @column({ columnName:'CAD_ID_CANAL', serializeAs:'cad_id_canal'})
  public cad_id_canal: number;

  @column({ columnName:'CAD_ACTIVO', serializeAs:'cad_activo' })
  public cad_activo: boolean;

  @column({ columnName:'CAD_ORDEN', serializeAs:'cad_orden'})
  public cad_orden: number;

}
