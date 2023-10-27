import { DateTime } from "luxon";
import { BaseModel, BelongsTo, ManyToMany, belongsTo, column, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import ObsObjectoSolicitud from "./ObsObjectoSolicitud";
import PrgPrograma from "./PrgPrograma";

export default class RequestSubjectType extends BaseModel {
  public static table = "TUS_TIPO_USUARIO";

  @column({ isPrimary: true, columnName: "TAS_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "TAS_NOMBRE", serializeAs: "name" })
  public name: string;

  @column({ columnName: "TAS_OBJECTO_SOLICITUD", serializeAs: "requestObjectId" })
  public requestObjectId: number;

  @column({ columnName: "TAS_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;

  @belongsTo(() => ObsObjectoSolicitud, {
    localKey: "obs_codigo",
    foreignKey: "requestObjectId",
  })
  public requestObject: BelongsTo<typeof ObsObjectoSolicitud>;

  @manyToMany(() => PrgPrograma, {
    pivotTable: "TAP_TIPOS_ASUNTO_SOLICITUD_PROGRAMA",
    localKey: "id",
    relatedKey: "prg_codigo",
    pivotForeignKey: "TAP_TIPO_ASUNTO_SOLICITUD",
    serializeAs: "programs",
    pivotRelatedForeignKey: "TAP_PROGRAMA",
    pivotColumns: ["TAP_CODIGO"],
  })
  public programs: ManyToMany<typeof PrgPrograma>;

  @column.dateTime({
    autoCreate: true,
    columnName: "TAS_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "TAS_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
