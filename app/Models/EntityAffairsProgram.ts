import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import AffairsProgram from "./AffairsProgram";
import WorkEntity from "./WorkEntity";

export default class EntityAffairsProgram extends BaseModel {
  public static table = "EPA_ENTIDAD_PROGRAMA_ASUNTO";

  @column({ isPrimary: true, columnName: "EPA_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "EPA_CODENT_ENTIDAD_TRABAJO", serializeAs: "workEntityId" })
  public workEntityId: number;

  @column({ columnName: "EPA_CODPRA_PROGRAMA_ASUNTO", serializeAs: "affairProgramId" })
  public affairProgramId: number;

  @belongsTo(() => WorkEntity, {
    localKey: "id",
    foreignKey: "workEntityId",
  })
  public workEntity: BelongsTo<typeof WorkEntity>;

  @belongsTo(() => AffairsProgram, {
    localKey: "id",
    foreignKey: "affairProgramId",
  })
  public affairsProgram: BelongsTo<typeof AffairsProgram>;

  @column.dateTime({
    autoCreate: true,
    columnName: "EPA_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "EPA_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
