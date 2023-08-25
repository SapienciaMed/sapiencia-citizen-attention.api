import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CnaCanalesAtencion extends BaseModel {

  public static table = 'CNA_CANALES_ATENCION';

  @column({ isPrimary: true, columnName: 'CNA_CODIGO' })
  public cna_codigo: number;

  @column({ columnName: 'CNA_CANAL', serializeAs: 'orden' })
  public cna_canal: string;

  @column({ columnName: 'CNA_ACTIVO', serializeAs: 'order' })
  public cna_activo: boolean;

  @column({ columnName: 'CNA_ORDEN', serializeAs: 'order' })
  public cna_orden: number;

}
