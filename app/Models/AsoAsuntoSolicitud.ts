import { BaseModel, BelongsTo, ManyToMany, belongsTo, column, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import ObsObjectoSolicitud from "./ObsObjectoSolicitud";
import PrgPrograma from "./PrgPrograma";
import { DateTime } from "luxon";
import BeneficiaryStatus from "./BeneficiaryStatus";
import Motive from "./Motive";

export default class AsoAsuntoSolicitud extends BaseModel {
  public static table = "ASO_ASUNTO_SOLICITUD";

  @column({ isPrimary: true, columnName: "ASO_CODIGO" })
  public aso_codigo: number;

  @column({ columnName: "ASO_ASUNTO", serializeAs: "aso_asunto" })
  public aso_asunto: string;

  @column({ columnName: "ASO_ACTIVO", serializeAs: "aso_activo" })
  public aso_activo: boolean;

  @column({ columnName: "ASO_ORDEN", serializeAs: "aso_orden" })
  public aso_orden: number;

  @column({ columnName: "ASO_CODOBS_OBJETO_SOLICITUD", serializeAs: "requestObjectId" })
  public requestObjectId: number;

  @column({ columnName: "ASO_CODEBE_ESTADO", serializeAs: "beneficiaryStatusId" })
  public beneficiaryStatusId: number;

  @belongsTo(() => BeneficiaryStatus, {
    localKey: "id",
    foreignKey: "beneficiaryStatusId",
  })
  public beneficiaryStatus: BelongsTo<typeof BeneficiaryStatus>;

  @belongsTo(() => ObsObjectoSolicitud, {
    localKey: "obs_codigo",
    foreignKey: "requestObjectId",
  })
  public requestObject: BelongsTo<typeof ObsObjectoSolicitud>;

  @manyToMany(() => PrgPrograma, {
    pivotTable: "ASP_ASUNTO_SOLICITUD_PROGRAMA",
    localKey: "aso_codigo",
    relatedKey: "prg_codigo",
    pivotForeignKey: "ASP_ASUNTO_SOLICITUD",
    serializeAs: "programs",
    pivotRelatedForeignKey: "ASP_PROGRAMA",
    pivotColumns: ["PRA_CODIGO"],
  })
  public programs: ManyToMany<typeof PrgPrograma>;

  @manyToMany(() => Motive, {
    pivotTable: "AMO_ASUNTOS_MOTIVOS",
    localKey: "aso_codigo",
    relatedKey: "id",
    pivotForeignKey: "AMO_CODASO_ASUNTO_SOLICITUD",
    serializeAs: "motives",
    pivotRelatedForeignKey: "AMO_CODMOV_MOTIVO",
    pivotColumns: ["AMO_CODIGO"],
  })
  public motives: ManyToMany<typeof Motive>;

  @column.dateTime({
    autoCreate: true,
    columnName: "ASO_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "ASO_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
