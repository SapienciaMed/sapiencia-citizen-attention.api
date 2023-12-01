import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Motive from './Motive';
import AsoAsuntoSolicitud from './AsoAsuntoSolicitud';

export default class MotiveRequestSubject extends BaseModel {
  public static table = "AMO_ASUNTOS_MOTIVOS";

  @column({ isPrimary: true, columnName: "AMO_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "AMO_CODASO_ASUNTO_SOLICITUD", serializeAs: "requestSubjectId" })
  public requestSubjectId: number;

  @column({ columnName: "AMO_CODMOV_MOTIVO", serializeAs: "motiveId" })
  public motiveId: number;

  @belongsTo(() => Motive, {
    localKey: "id",
    foreignKey: "motiveId",
  })
  public motive: BelongsTo<typeof Motive>;

  @belongsTo(() => AsoAsuntoSolicitud, {
    localKey: "aso_codigo",
    foreignKey: "requestSubjectId",
  })
  public requestSubject: BelongsTo<typeof AsoAsuntoSolicitud>;
}
