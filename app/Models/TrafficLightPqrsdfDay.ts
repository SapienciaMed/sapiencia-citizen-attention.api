import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class TrafficLightPqrsdfDay extends BaseModel {
  public static table = "SEM_SEMAFORO_DIAS_PQRSDF";

  @column({ isPrimary: true, columnName: "SEM_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "SEM_DIA_INICIAL", serializeAs: "initialDay" })
  public initialDay: number;

  @column({ columnName: "SEM_DIA_FINAL", serializeAs: "finalDay" })
  public finalDay: number;

  @column({ columnName: "SEM_ID_COLOR", serializeAs: "color" })
  public color: string;

  @column({ columnName: "SEM_ACTIVO", serializeAs: "isActive" })
  public isActive: boolean;
}
