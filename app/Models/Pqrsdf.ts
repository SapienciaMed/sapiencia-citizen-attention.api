import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import File from "./File";
import AsoAsuntoSolicitud from "./AsoAsuntoSolicitud";
import MreMedioRespuesta from "./MreMedioRespuesta";
import Person from "./Person";
import TsoTipoSolicitud from "./TsoTipoSolicitud";
import WorkEntity from "./WorkEntity";
import LepListadoEstadoPqrsdf from "./LepListadoEstadoPqrsdf";

export default class Pqrsdf extends BaseModel {
  public static table = "PQR_PQRSDF";

  @column({ isPrimary: true, columnName: "PQR_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PQR_CODTSO_TIPO_SOLICITUD", serializeAs: "requestTypeId" })
  public requestTypeId: number;

  @column({ columnName: "PQR_CODPER_PERSONA", serializeAs: "personId" })
  public personId: number;

  @column({ columnName: "PQR_CODMRE_MRE_RESPUESTA", serializeAs: "responseMediumId" })
  public responseMediumId: number;

  @column({ columnName: "PQR_CODLEP_LISTADO_ESTADO_PQRSDF", serializeAs: "statusId" })
  public statusId: number;

  @column({ columnName: "PQR_CODENT_ENTIDAD_TRABAJO", serializeAs: "responsibleId" })
  public responsibleId: number;

  @column({ columnName: "PQR_CODASO_ASO_ASUNTO_SOLICITUD", serializeAs: "requestSubjectId" })
  public requestSubjectId: number;

  @column({ columnName: "PQR_CODARC_ARCHIVO", serializeAs: "fileId" })
  public fileId: number;

  @column({ columnName: "PQR_NRO_RADICADO", serializeAs: "filingNumber" })
  public filingNumber: number;

  @column({ columnName: "PQR_CLASIFICACION", serializeAs: "clasification" })
  public clasification: string;

  @column({ columnName: "PQR_DEPENDENCIA", serializeAs: "dependency" })
  public dependency: string;

  @column({ columnName: "PQR_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "PQR_RESPUESTA", serializeAs: "answer" })
  public answer: string;

  @column.date({ columnName: "PQR_FECHA_RESPUESTA", serializeAs: "answerDate" })
  public answerDate: DateTime;


  @belongsTo(() => TsoTipoSolicitud, {
    localKey: "tso_codigo",
    foreignKey: "requestTypeId",
  })
  public requestType: BelongsTo<typeof TsoTipoSolicitud>;

  @belongsTo(() => Person, {
    localKey: "id",
    foreignKey: "personId",
  })
  public person: BelongsTo<typeof Person>;

  @belongsTo(() => MreMedioRespuesta, {
    localKey: "mre_codigo",
    foreignKey: "responseMediumId",
  })
  public responseMedium: BelongsTo<typeof MreMedioRespuesta>;

  @belongsTo(() => WorkEntity, {
    localKey: "id",
    foreignKey: "responsibleId",
  })
  public responsible: BelongsTo<typeof WorkEntity>;

  @belongsTo(() => LepListadoEstadoPqrsdf, {
    localKey: "lep_codigo",
    foreignKey: "statusId",
  })
  public status: BelongsTo<typeof LepListadoEstadoPqrsdf>;

  @belongsTo(() => AsoAsuntoSolicitud, {
    localKey: "aso_codigo",
    foreignKey: "responseMediumId",
  })
  public requestSubject: BelongsTo<typeof AsoAsuntoSolicitud>;

  @belongsTo(() => File, {
    localKey: "id",
    foreignKey: "fileId",
  })
  public file: BelongsTo<typeof File>;

  @column.dateTime({
    autoCreate: true,
    columnName: "PQR_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "PQR_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
