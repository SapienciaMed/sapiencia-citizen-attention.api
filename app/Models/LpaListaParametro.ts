import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LpaListaParametro extends BaseModel {
  
  public static table = 'LPA_LISTA_PARAMETROS';

  @column({ isPrimary: true, columnName:'LPA_CODIGO' })
  public lpa_codigo: number;

  @column({ columnName:'LPA_DESCRIPCION', serializeAs:'lpa_descripcion' })
  public lpa_descripcion: string;

  @column({ columnName:'LPA_VALOR', serializeAs:'lpa_valor' })
  public lpa_valor: string;

  @column({ columnName:'LPA_ID_APLICATIVO', serializeAs:'lpa_id_aplicativo' })
  public lpa_id_aplicativo: number; 

}
