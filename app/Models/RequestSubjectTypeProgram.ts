import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class RequestSubjectTypeProgram extends BaseModel {
  public static table = "ASP_ASUNTO_SOLICITUD_PROGRAMA";

  @column({ isPrimary: true, columnName: "ASP_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ASP_PROGRAMA", serializeAs: "programId" })
  public programId: number;

  @column({ columnName: "ASP_ASUNTO_SOLICITUD", serializeAs: "requestSubjectId" })
  public requestSubjectId: number;
}
