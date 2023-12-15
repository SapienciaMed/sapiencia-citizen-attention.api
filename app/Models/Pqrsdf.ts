import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import File from "./File";
import AsoAsuntoSolicitud from "./AsoAsuntoSolicitud";
import MreMedioRespuesta from "./MreMedioRespuesta";
import Person from "./Person";
import TsoTipoSolicitud from "./TsoTipoSolicitud";
import CadCanalesAtencionDetalle from "./CadCanalesAtencionDetalle";
import WorkEntity from "./WorkEntity";
import LepListadoEstadoPqrsdf from "./LepListadoEstadoPqrsdf";
import PrgPrograma from "./PrgPrograma";
import Motive from "./Motive";
import PqrsdfResponse from "./PqrsdfResponse";
import SrbSolicitudReabrir from "./SrbSolicitudReabrir";

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

  @column({ columnName: "PQR_NRO_RADICADO_SALIDA", serializeAs: "exitFilingNumber" })
  public exitFilingNumber: number;

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

  @column.date({ columnName: "PQR_FECHA_PRORROGA", serializeAs: "extensionDate" })
  public extensionDate: DateTime;

  @column({ columnName: "PQR_CODCAD_CANALES_ATENCION_DETALLE_PQRSDF", serializeAs: "idCanalesAttencion" })
  public idCanalesAttencion: number;

  @column({ columnName: "PQR_CODPRG_PROGRAMA", serializeAs: "programId" })
  public programId: number;

  @column({ columnName: "PQR_CODMOV_MOTIVO", serializeAs: "motiveId" })
  public motiveId: number;

  @column({ columnName: "PQR_CODSRB_SRB_SOLICITU_REABRIR", serializeAs: "reopenRequestId" })
  public reopenRequestId: number;

  @belongsTo(() => Motive, {
    localKey: "id",
    foreignKey: "motiveId",
  })
  public motive: BelongsTo<typeof Motive>;

  @belongsTo(() => SrbSolicitudReabrir, {
    localKey: "srb_codigo",
    foreignKey: "reopenRequestId",
  })
  public reopenRequest: BelongsTo<typeof SrbSolicitudReabrir>;

  @belongsTo(() => PrgPrograma, {
    localKey: "prg_codigo",
    foreignKey: "programId",
  })
  public program: BelongsTo<typeof PrgPrograma>;

  @belongsTo(() => CadCanalesAtencionDetalle, {
    localKey: "cad_codigo",
    foreignKey: "idCanalesAttencion",
  })
  public canalesAttencion: BelongsTo<typeof CadCanalesAtencionDetalle>;

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

  @hasMany(() => PqrsdfResponse, {
    localKey: "id",
    foreignKey: "pqrsdfId",
  })
  public pqrsdfResponses: HasMany<typeof PqrsdfResponse>;

  @belongsTo(() => File, {
    localKey: "id",
    foreignKey: "fileId",
  })
  public file: BelongsTo<typeof File>;

  @column.dateTime({
    columnName: "PQR_FECHA_CIERRE",
    serializeAs: "closedAt",
  })
  public closedAt: DateTime;

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
