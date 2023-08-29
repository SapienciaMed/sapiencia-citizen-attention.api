import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DepDependencia extends BaseModel {
  
  public static table = 'DEP_DEPENDENCIA';

  @column({ isPrimary: true, columnName:'DEP_CODIGO' })
  public dep_codigo: number;

  @column({ columnName:'DEP_DESCRIPCION', serializeAs:'dep_descripcion' })
  public dep_descripcion: string;

  @column({ columnName:'DEP_ACTIVO', serializeAs:'dep_activo' })
  public dep_activo: boolean;

  @column({ columnName:'DEP_ORDEN', serializeAs:'dep_orden' })
  public dep_orden: number;

}
