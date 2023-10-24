import { DateTime } from "luxon";
import { IPerson } from "./PersonInterfaces";
import { IResponseMedium } from "./ResponseMediumInterfaces";
import { IRequestSubject } from "./RequestSubjectInterfaces";
import { IFile } from "./FileInterfaces";
import { IRequestType } from "./RequestTypeInterfaces";
import { IWorkEntity } from "./WorkEntityInterfaces";

export interface IPqrsdf {
  id?: number;
  requestTypeId: number;
  personId?: number;
  responseMediumId: number;
  responsibleId?: number;
  requestSubjectId: number;
  fileId?: number;
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
  requestSubject?: IRequestSubject;
  file?: IFile;
  createdAt?: DateTime;
  updatedAt?: DateTime;
}

export interface IPqrsdfStatus {
  lep_codigo: number;
  lep_estado: string;
  lep_activo: boolean;
  lep_orden: number;
}
