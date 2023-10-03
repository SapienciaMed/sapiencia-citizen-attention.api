import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import PrgPrograma from "./PrgPrograma";
import AsoAsuntoSolicitud from "./AsoAsuntoSolicitud";

export default class AffairsProgram extends BaseModel {
  public static table = "PRA_PROGRAMA_ASUNTOS";

  @column({ isPrimary: true, columnName: "PRA_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PRA_CODASO_ASUNTO_SOLICITUD", serializeAs: "affairId" })
  public affairId: number;

  @column({ columnName: "PRA_CODPRG_PROGRAMA", serializeAs: "programId" })
  public programId: number;

  @belongsTo(() => PrgPrograma, {
    localKey: "prg_codigo",
    foreignKey: "programId",
  })
  public program: BelongsTo<typeof PrgPrograma>;

  @belongsTo(() => AsoAsuntoSolicitud, {
    localKey: "aso_codigo",
    foreignKey: "affairId",
  })
  public affair: BelongsTo<typeof AsoAsuntoSolicitud>;

  @column.dateTime({
    autoCreate: true,
    columnName: "PRA_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "PRA_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
