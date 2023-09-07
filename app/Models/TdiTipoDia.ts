import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TdiTipoDia extends BaseModel {

  public static table = 'TDI_TIPO_DIA';

  @column({ isPrimary: true, columnName:'TDI_CODIGO' })
  public tdi_codigo: number;

  @column({ columnName:'TDI_DESCRIPCION', serializeAs:'tdi_descripcion' })
  public tdi_descripcion: string;

  @column({ columnName:'TDI_ACTIVO', serializeAs:'tdi_activo' })
  public tdi_activo: boolean;

  @column({ columnName:'TDI_ORDEN', serializeAs:'tdi_orden'})
  public tdi_orden: number;

}
