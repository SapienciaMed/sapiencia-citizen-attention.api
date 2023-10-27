import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class RequestSubjectTypeProgram extends BaseModel {
  public static table = "TAP_TIPOS_ASUNTO_SOLICITUD_PROGRAMA";

  @column({ isPrimary: true, columnName: "TAP_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "TAP_PROGRAMA", serializeAs: "programId" })
  public programId: number;

  @column({ columnName: "TAP_TIPO_ASUNTO_SOLICITUD", serializeAs: "requestSubjectId" })
  public requestSubjectId: number;
}
