export interface ItypeRequest {
    TSO_CODIGO : number;
    TSO_DESCRIPTION : string;
    TSO_ACTIVO : boolean;
    TSO_ORDEN :number;
}

export interface IGenericData {
    id: number;
    descrition?: string;
    status?: boolean;
    orden: number;
  }