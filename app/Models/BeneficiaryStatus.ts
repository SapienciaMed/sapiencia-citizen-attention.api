import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class BeneficiaryStatus extends BaseModel {
  public static table = "EBE_ESTADOS_BENEFICIARIO";

  @column({ isPrimary: true, columnName: "EBE_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "EBE_CODIGO_SAPIENCIA", serializeAs: "sapienciaId" })
  public sapienciaId: number;

  @column({ columnName: "EBE_ESTADO", serializeAs: "status" })
  public status: string;

  @column({ columnName: "EBE_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;
}
