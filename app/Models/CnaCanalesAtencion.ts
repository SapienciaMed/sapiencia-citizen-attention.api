import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import CadCanalesAtencionDetalle from "./CadCanalesAtencionDetalle";

export default class CnaCanalesAtencion extends BaseModel {
  public static table = "CNA_CANALES_ATENCION";

  @column({ isPrimary: true, columnName: "CNA_CODIGO" })
  public cna_codigo: number;

  @column({ columnName: "CNA_CANAL", serializeAs: "cna_canal" })
  public cna_canal: string;

  @column({ columnName: "CNA_ACTIVO", serializeAs: "cna_activo" })
  public cna_activo: boolean;

  @column({ columnName: "CNA_ORDEN", serializeAs: "cna_orden" })
  public cna_orden: number;

  @hasMany(() => CadCanalesAtencionDetalle, {
    localKey: "cna_codigo",
    foreignKey: "cad_id_canal",
  })
  public details: HasMany<typeof CadCanalesAtencionDetalle>;
}
