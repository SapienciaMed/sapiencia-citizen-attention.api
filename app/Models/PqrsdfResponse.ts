import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import DepDependencia from "./DepDependencia";
import Factor from "./Factor";
import ResponseType from "./ResponseType";

export default class PqrsdfResponse extends BaseModel {
  public static table = "RPF_RESPUESTA_PQRSDF";

  @column({ isPrimary: true, columnName: "RPF_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "RPF_NRO_RADICADO", serializeAs: "filingNumber" })
  public filingNumber: number;

  @column({ columnName: "RPF_PETICIONARIO", serializeAs: "isPetitioner" })
  public isPetitioner: boolean;

  @column({ columnName: "RPF_CODPQR_PQRSDF", serializeAs: "pqrsdfId" })
  public pqrsdfId: number;

  @column({ columnName: "RPF_CODTRP_TIPORES", serializeAs: "responseTypeId" })
  public responseTypeId: number;

  @column({ columnName: "RPF_CODTET_TIPOENT", serializeAs: "workEntityTypeId" })
  public workEntityTypeId: number;

  @column({ columnName: "RPF_CODFAC_FACTOR", serializeAs: "factorId" })
  public factorId: number;

  @column({ columnName: "RPF_CODARC_ARCHIVO", serializeAs: "fileId" })
  public fileId: number;

  @column({ columnName: "RPF_CODUSR_USUARIOASI", serializeAs: "assignedUserId" })
  public assignedUserId: number;

  @column({ columnName: "RPF_CODDEP_DEPENDECIAASI", serializeAs: "assignedDependenceId" })
  public assignedDependenceId: number;

  @column({ columnName: "RPF_CODUSR_USUARIORES", serializeAs: "respondingUserId" })
  public respondingUserId: number;

  @column({ columnName: "RPF_CODDEP_DEPENDECIARES", serializeAs: "respondingDependenceId" })
  public respondingDependenceId: number;

  @belongsTo(() => DepDependencia, {
    localKey: "dep_codigo",
    foreignKey: "assignedDependenceId",
  })
  public assignedDependence: BelongsTo<typeof DepDependencia>;

  @belongsTo(() => DepDependencia, {
    localKey: "dep_codigo",
    foreignKey: "respondingDependenceId",
  })
  public respondingDependence: BelongsTo<typeof DepDependencia>;

  @belongsTo(() => Factor, {
    localKey: "id",
    foreignKey: "factorId",
  })
  public factor: BelongsTo<typeof Factor>;

  @belongsTo(() => ResponseType, {
    localKey: "id",
    foreignKey: "responseTypeId",
  })
  public responseType: BelongsTo<typeof ResponseType>;

  @column({ columnName: "RPF_OBSERVACION", serializeAs: "observation" })
  public observation: string;

  @column.dateTime({
    autoCreate: true,
    columnName: "RPF_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "RPF_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
