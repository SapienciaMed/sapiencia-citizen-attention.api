import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import CadCanalesAtencionDetalle from "./CadCanalesAtencionDetalle";
import AttentionRequestType from "./AttentionRequestType";
import DepDependencia from "./DepDependencia";
import PrgPrograma from "./PrgPrograma";
import AsoAsuntoSolicitud from "./AsoAsuntoSolicitud";
import Corregimiento from "./Corregimiento";
import UserType from "./UserType";

export default class CitizenAttention extends BaseModel {
  public static table = "ACI_ATENCION_CIUDADANA";

  @column({ isPrimary: true, columnName: "ACI_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ACI_CODTDO_TIPO_DOCUMENTO", serializeAs: "documentTypeId" })
  public documentTypeId: number;

  @column({ columnName: "ACI_NUMERO_DOCUMENTO", serializeAs: "identification" })
  public identification: string;

  @column({ columnName: "ACI_RAZON_SOCIAL", serializeAs: "businessName" })
  public businessName: string;

  @column({ columnName: "ACI_PRIMER_NOMBRE", serializeAs: "firstName" })
  public firstName: string;

  @column({ columnName: "ACI_SEGUNDO_NOMBRE", serializeAs: "secondName" })
  public secondName: string;

  @column({ columnName: "ACI_PRIMER_APELLIDO", serializeAs: "firstSurname" })
  public firstSurname: string;

  @column({ columnName: "ACI_SEGUNDO_APELLIDO", serializeAs: "secondSurname" })
  public secondSurname: string;

  @column({ columnName: "ACI_NUMERO_CONTACTO_PRIMARIO", serializeAs: "firstContactNumber" })
  public firstContactNumber: string;

  @column({ columnName: "ACI_NUMERO_CONTACTO_SECUNDARIO", serializeAs: "secondContactNumber" })
  public secondContactNumber: string;

  @column({ columnName: "ACI_OBSERVACION", serializeAs: "observation" })
  public observation: string;

  @column({ columnName: "ACI_CODCAD_CANAL_DETALLE", serializeAs: "DetailServiceChannelId" })
  public detailServiceChannelId: number;

  @column({ columnName: "ACI_CODTSA_TIPO_SOLICITUD", serializeAs: "attentionRequestTypeId" })
  public attentionRequestTypeId: number;

  @column({ columnName: "ACI_CODDEP_DEPENDENCIA", serializeAs: "dependencyId" })
  public dependencyId: number;

  @column({ columnName: "ACI_CODPRG_PROGRAMA", serializeAs: "programId" })
  public programId: number;

  @column({ columnName: "ACI_CODASO_ASUNTO", serializeAs: "requestSubjectTypeId" })
  public requestSubjectTypeId: number;

  @column({ columnName: "ACI_CODCRG_COMUNAS", serializeAs: "corregimientoId" })
  public corregimientoId: number;

  @column({ columnName: "ACI_TIPO_USUARIO", serializeAs: "userTypeId" })
  public userTypeId: number;

  @belongsTo(() => CadCanalesAtencionDetalle, {
    localKey: "cad_codigo",
    foreignKey: "detailServiceChannelId",
  })
  public detailServiceChannel: BelongsTo<typeof CadCanalesAtencionDetalle>;

  @belongsTo(() => AttentionRequestType, {
    localKey: "id",
    foreignKey: "attentionRequestTypeId",
  })
  public attentionRequestType: BelongsTo<typeof AttentionRequestType>;

  @belongsTo(() => DepDependencia, {
    localKey: "dep_codigo",
    foreignKey: "dependencyId",
  })
  public dependency: BelongsTo<typeof DepDependencia>;

  @belongsTo(() => PrgPrograma, {
    localKey: "prg_codigo",
    foreignKey: "programId",
  })
  public program: BelongsTo<typeof PrgPrograma>;

  @belongsTo(() => AsoAsuntoSolicitud, {
    localKey: "aso_codigo",
    foreignKey: "requestSubjectTypeId",
  })
  public requestSubjectType: BelongsTo<typeof AsoAsuntoSolicitud>;

  @belongsTo(() => Corregimiento, {
    localKey: "id",
    foreignKey: "corregimientoId",
  })
  public corregimiento: BelongsTo<typeof Corregimiento>;

  @belongsTo(() => UserType, {
    localKey: "id",
    foreignKey: "userTypeId",
  })
  public userType: BelongsTo<typeof UserType>;

  @column.dateTime({
    autoCreate: true,
    columnName: "ACI_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "ACI_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
