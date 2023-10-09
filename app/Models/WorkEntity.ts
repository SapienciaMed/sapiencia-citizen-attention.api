import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import EntityAffairsProgram from "./EntityAffairsProgram";
import TetTipoEntidadTrabajo from "./TetTipoEntidadTrabajo";

export default class WorkEntity extends BaseModel {
  public static table = "ENT_ENTIDAD_TRABAJO";

  @column({ isPrimary: true, columnName: "ENT_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ENT_CODUSR_USUARIO", serializeAs: "userId" })
  public userId: number;

  @column({ columnName: "ENT_CODTET_TIPO_ENTIDAD_TRABAJO", serializeAs: "workEntityTypeId" })
  public workEntityTypeId: number;

  @column({ columnName: "ENT_ORDEN", serializeAs: "order" })
  public order: number;

  @column({ columnName: "ENT_ESTADO", serializeAs: "status" })
  public status: boolean;

  @column({ columnName: "ENT_NOMBRE_ENTIDAD", serializeAs: "name" })
  public name: string;

  @belongsTo(() => TetTipoEntidadTrabajo, {
    localKey: "tet_codigo",
    foreignKey: "workEntityTypeId",
  })
  public workEntityType: BelongsTo<typeof TetTipoEntidadTrabajo>;

  @hasMany(() => EntityAffairsProgram, {
    localKey: "id",
    foreignKey: "workEntityId",
  })
  public affairsPrograms: HasMany<typeof EntityAffairsProgram>;

  @column.dateTime({
    autoCreate: true,
    columnName: "ENT_FECHA_CREACION",
    serializeAs: "createdAt",
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "ENT_FECHA_ACTUALIZACION",
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;
}
