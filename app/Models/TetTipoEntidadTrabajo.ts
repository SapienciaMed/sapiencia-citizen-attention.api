import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TetTipoEntidadTrabajo extends BaseModel {

  public static table = 'TET_TIPO_ENTIDAD_TRABAJO';

  @column({ isPrimary: true, columnName:'TET_CODIGO' })
  public tet_codigo: number;

  @column({ columnName:'TET_DESCRIPCION', serializeAs:'tet_descripcion' })
  public tet_descripcion: string;

  @column({ columnName:'TET_ACTIVO', serializeAs:'tet_activo'})
  public tet_activo: boolean;

  @column({ columnName:'TET_ORDEN', serializeAs:'tet_orden' })
  public tet_orden: number;

}
