import { DateTime } from "luxon";
import { IProgram } from "./ProgramInterfaces";

export interface IRequestSubjectType {
  aso_codigo?: number;
  aso_asunto: string;
  aso_activo?: boolean;
  aso_orden?: number;
  requestObjectId: number;
  requestObject?: IRequestObject;
  programs?: IProgram[];
  createdAt?: DateTime;
  updatedAt?: DateTime;
}

export interface IRequestSubjectTypeFilters{
  aso_codigo?: number;
  aso_asunto?: string;
  requestObjectId?: number;
  programs?: number[];
  page?: number;
  perPage?: number;
}

export interface IRequestObject {
  obs_codigo?: number;
  obs_description?: string;
  obs_termino_dias?: number;
  obs_tipo_dias?: string;
  obs_activo?: boolean;
  obs_orden?: number;
}
