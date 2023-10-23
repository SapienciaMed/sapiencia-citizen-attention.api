import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import LepListadoEstadoPqrsdf from "./LepListadoEstadoPqrsdf";
import DepDependencia from "./DepDependencia";

export default class TetTipoEntidadTrabajo extends BaseModel {
  public static table = "TET_TIPO_ENTIDAD_TRABAJO";

  @column({ isPrimary: true, columnName: "TET_CODIGO" })
  public tet_codigo: number;

  @column({ columnName: "TET_ESTADO_ASOCIADO", serializeAs: "associatedStatusId" })
  public associatedStatusId: number;

  @column({ columnName: "TET_DEPENDENCIA", serializeAs: "dependenceId" })
  public dependenceId: number;

  @column({ columnName: "TET_DESCRIPCION", serializeAs: "tet_descripcion" })
  public tet_descripcion: string;

  @column({ columnName: "TET_ACTIVO", serializeAs: "tet_activo" })
  public tet_activo: boolean;

  @column({ columnName: "TET_ORDEN", serializeAs: "tet_orden" })
  public tet_orden: number;

  @belongsTo(() => LepListadoEstadoPqrsdf, {
    localKey: "lep_codigo",
    foreignKey: "statusId",
  })
  public status: BelongsTo<typeof LepListadoEstadoPqrsdf>;

  @belongsTo(() => DepDependencia, {
    localKey: "lep_codigo",
    foreignKey: "dependenceId",
  })
  public dependece: BelongsTo<typeof DepDependencia>;
}
