import { DateTime } from "luxon";
import { IPerson } from "./PersonInterfaces";
import { IResponseMedium } from "./ResponseMediumInterfaces";
import { IRequestSubject } from "./RequestSubjectInterfaces";
import { IFile } from "./FileInterfaces";
import { IRequestType } from "./RequestTypeInterfaces";
import { IWorkEntity } from "./WorkEntityInterfaces";
import { IMotive } from "./MotiveInterfaces";

export interface IPqrsdf {
  id?: number;
  requestTypeId: number;
  personId?: number;
  responseMediumId: number;
  responsibleId?: number;
  requestSubjectId: number;
  fileId?: number;
  motiveId?: number;
  statusId?: number;
  filingNumber?: number;
  idCanalesAttencion?: number;
  clasification: string;
  dependency: string;
  description: string;
  requestType?: IRequestType;
  person?: IPerson;
  answer?: string;
  answerDate?: DateTime;
  responseMedium?: IResponseMedium;
  responsible?: IWorkEntity;
  status?: IPqrsdfStatus;
  program?: Iprogram;
  motive?: IMotive;
  requestSubject?: IRequestSubject;
  file: IFile;
  closedAt?: DateTime;
  createdAt?: DateTime;
  updatedAt?: DateTime;
}

export interface IPqrsdfFilters {
  page: number;
  perPage: number;
  id?: number;
  filingNumber?: string;
  identification?: string;
  programId?: number;
  requestType?: number;
  closedAt?: DateTime;
}

export interface IPqrsdfStatus {
  lep_codigo: number;
  lep_estado: string;
  lep_activo: boolean;
  lep_orden: number;
}

export interface IrequestPqrsdf {
  userId?: number;
  typeReques?: number;
  filter?: string;
}

export interface Iprogram {
  prg_codigo: number;
  prg_descripcion: string;
  clp_codigo: number;
  clp_descripcion: string;
  dep_codigo: number;
  dep_descripcion: string;
}

export interface IpqrsdfByReques {
  PQR_CODIGO?: number;
  PQR_NRO_RADICADO?: number;
  PQR_FECHA_CREACION?: string;
  PER_NUMERO_DOCUMENTO?: string;
  PER_PRIMER_NOMBRE?: string;
  PER_SEGUNDO_NOMBRE?: string;
  PER_PRIMER_APELLIDO?: string;
  PER_SEGUNDO_APELLIDO?: string;
  ASO_ASUNTO?: string;
  LEP_ESTADO?: string;
  OBS_TIPO_DIAS?: string;
  OBS_TERMINO_DIAS?: number;
  PRG_DESCRIPCION?: string;
  SBR_ESTADO?: string;
}

export interface IrequestReopen {
  srb_justificacion?: string;
  sbr_estado?: boolean;
}


export interface IPqrsdfResponse {
  id?: number;
  filingNumber?: number;
  isPetitioner?: boolean;
  pqrsdfId?: number;
  responseTypeId?: number;
  workEntityTypeId?: number;
  factorId?: number;
  fileId?: number;
  assignedUserId?: number;
  respondingUserId?: number;
  observation?: string;
  createdAt?: DateTime;
  updatedAt?: DateTime;
}
