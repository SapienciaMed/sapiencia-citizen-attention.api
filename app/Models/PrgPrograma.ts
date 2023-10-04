import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ClpClasificacionPrograma from './ClpClasificacionPrograma';
import DepDependencia from './DepDependencia';
import AsoAsuntoSolicitud from './AsoAsuntoSolicitud';

export default class PrgPrograma extends BaseModel {

  public static table = 'PRG_PROGRAMAS';

  @column({ isPrimary: true, columnName:'PRG_CODIGO' })
  public prg_codigo: number;

  @column({ columnName:'PRG_DESCRIPCION', serializeAs:'' })
  public prg_descripcion: string;

  @column({ columnName:'PRG_CLASIFICACION', serializeAs:'' })
  public prg_clasificacion: number;

  @column({ columnName:'PRG_DEPENDENCIA', serializeAs:'prg_dependencia' })
  public prg_dependencia: number;

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

  @manyToMany(() => AsoAsuntoSolicitud, {
    pivotTable: 'PRA_PROGRAMA_ASUNTOS',
    localKey: 'prg_codigo',
    relatedKey: 'aso_codigo',
    pivotForeignKey: 'PRA_CODPRG_PROGRAMA',
    serializeAs:'clpClasificacionPrograma',
    pivotRelatedForeignKey: 'PRA_CODASO_ASUNTO_SOLICITUD'
  })
  public affairs: ManyToMany<typeof AsoAsuntoSolicitud>;

  @column({ columnName:'PRG_ACTIVO', serializeAs:'prg_activo' })
  public prg_activo: boolean;

  @column({ columnName:'PRG_ORDEN', serializeAs:'prg_orden' })
  public prg_orden: number;


}
