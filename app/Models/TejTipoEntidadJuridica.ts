import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TejTipoEntidadJuridica extends BaseModel {

  public static table = 'TEJ_TIPO_ENTIDAD_JURIDICA';

  @column({ isPrimary: true, columnName:'TEJ_CODIGO' })
  public tej_codigo: number;

  @column({ columnName:'TEJ_NOMBRE', serializeAs:'tej_nombre'})
  public tej_nombre: string;

  @column({ columnName:'TEJ_ACTIVO', serializeAs:'tej_activo' })
  public tej_activo: boolean;

  @column({ columnName:'TEJ_ORDEN', serializeAs:'tej_orden'})
  public tej_orden: number;

}
