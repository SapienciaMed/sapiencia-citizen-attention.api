import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SrbSolicitudReabrir extends BaseModel {
  public static table = 'SRB_SOLICITUD_REABRIR';

  @column({ isPrimary: true, columnName:'SRB_CODIGO' })
  public srb_codigo: number;

  @column({ columnName:'SRB_JUSTIFICACION', serializeAs:'srb_justificacion' })
  public srb_justificacion: string;

  @column({ columnName:'SBR_ESTADO', serializeAs:'sbr_estado' })
  public sbr_estado: boolean;


}
