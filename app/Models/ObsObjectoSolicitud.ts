import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ObsObjectoSolicitud extends BaseModel {

  public static table = 'OBS_OBJECTO_SOLICITUD';

  @column({ isPrimary: true, columnName: 'OBS_CODIGO' })
  public obs_codigo: number;

  @column({ columnName: 'OBS_DESCRIPCION', serializeAs:'obs_description' })
  public obs_description: string;

  @column({ columnName:'OBS_TERMINO_DIAS_HABILES', serializeAs:'obs_termino_dias_habiles'})
  public obs_termino_dias_habiles: string;

  @column({ columnName:'OBS_ACTIVO', serializeAs:'obs_activo'})
  public obs_activo: boolean;

  @column({ columnName:'OBS_ORDEN', serializeAs:'obs_orden'})
  public obs_orden: number;

}
