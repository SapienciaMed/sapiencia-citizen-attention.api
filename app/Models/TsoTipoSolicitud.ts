import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TsoTipoSolicitud extends BaseModel {
  
  public static table = 'TSO_TIPO_SOLICITUD';

  @column({ isPrimary: true, columnName: 'TSO_CODIGO' })
  public tso_codigo: number;

  @column({ columnName: 'TSO_DESCRIPTION', serializeAs:'tso_description' })
  public tso_description: string;

  @column({ columnName: 'TSO_ACTIVO', serializeAs:'tso_activo'})
  public tso_activo: boolean;

  @column({ columnName: 'TSO_ORDEN', serializeAs: 'tso_orden' })
  public tso_orden :number;
  
}
