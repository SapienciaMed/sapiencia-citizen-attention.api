import { DateTime } from "luxon";
import { IFile } from "./FileInterfaces";
import { IMotive } from "./MotiveInterfaces";
import { IPerson } from "./PersonInterfaces";
import { IRequestSubjectType } from "./RequestSubjectTypeInterfaces";
import { IRequestType } from "./RequestTypeInterfaces";
import { IResponseMedium } from "./ResponseMediumInterfaces";
import { IWorkEntity } from "./WorkEntityInterfaces";
import { IUser } from "./UserInterfaces";
import { IFactor } from "./MasterTablesUtilityInterfaces";
import { IResponseType } from "./ResponseTypeInterfaces";
import { IDependence } from "./DependenceInterfaces";

export interface IPqrsdf {
  id?: number;
  requestTypeId: number;
  personId?: number;
  responseMediumId: number;
  programId?: number;
  responsibleId?: number | null;
  requestSubjectId: number;
  fileId?: number;
  motiveId?: number;
  reopenRequestId?: number;
  statusId?: number;
  filingNumber?: number;
  exitFilingNumber?: number;
  idCanalesAttencion?: number;
  clasification: string;
  dependency: string;
  description: string;
  requestType?: IRequestType;
  motive?: IMotive;
  reopenRequest?: IReopenRequest;
  person?: IPerson;
  answer?: string;
  program?: Iprogram;
  answerDate?: DateTime;
  extensionDate?: DateTime;
  responsible?: IWorkEntity;
  responseMedium?: IResponseMedium;
  requestSubject?: IRequestSubjectType;
  status?: IPqrsdfStatus;
  response?: IPqrsdfResponse;
  file: IFile;
  supportFiles?: IFile[];
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
  lep_codigo?: number;
  lep_estado?: string;
  lep_activo?: boolean;
  lep_orden?: number;
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

export interface IpqrsdfByRequest {
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

export interface IReopenRequest {
  srb_codigo?: number;
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
  workEntityId?: number;
  factorId?: number;
  fileId?: number;
  file?: IFile;
  factor?: IFactor;
  responseType?: IResponseType;
  pqrsdf?: IPqrsdf;
  assignedUserId?: number;
  assignedUser?: IUser;
  assignedDependenceId?: number;
  respondingUserId: number;
  respondingUser?: IUser;
  respondingDependenceId?: number;
  assignedDependence?: IDependence;
  respondingDependence?: IDependence;
  observation?: string;
  createdAt?: DateTime;
  updatedAt?: DateTime;
}

export interface IResponseFilters {
  responseType?: IResponseType;
  pqrsdfId?: number;
  perPage?: number;
  page?: number;
}
