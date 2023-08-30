import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ClpClasificacionPrograma from './ClpClasificacionPrograma';
import DepDependencia from './DepDependencia';

export default class PrgPrograma extends BaseModel {
  
  public static table = 'PRG_PROGRAMAS';

  @column({ isPrimary: true, columnName:'PRG_CODIGO' })
  public prg_codigo: number;

  @column({ columnName:'PRG_DESCRIPCION', serializeAs:'' })
  public prg_descripcion: string;

  @hasMany(() => ClpClasificacionPrograma, {
    localKey: 'prg_codigo',
    foreignKey: 'clp_codigo',
    serializeAs:'clpClasificacionPrograma'
  })
  public clpClasificacionPrograma: HasMany<typeof ClpClasificacionPrograma>;

  @hasMany(() => DepDependencia, {
    localKey: 'prg_codigo',
    foreignKey: 'dep_codigo',
    serializeAs: 'depDependencia'
  })
  public depDependencia: HasMany<typeof DepDependencia>;

  @column({ columnName:'PRG_ACTIVO', serializeAs:'prg_activo' })
  public prg_activo: boolean;

  @column({ columnName:'PRG_ORDEN', serializeAs:'prg_orden' })
  public prg_orden: number;


}
