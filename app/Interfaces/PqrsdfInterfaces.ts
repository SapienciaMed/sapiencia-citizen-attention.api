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
  filingNumber?: number;
  idCanalesAttencion?:number;
  clasification: string;
  dependency: string;
  description: string;
  requestType?: IRequestType;
  person?: IPerson;
  answer?: string;
  answerDate?: DateTime;
  responseMedium?: IResponseMedium;
  responsible?: IWorkEntity;
  requestSubject?: IRequestSubject;
  file?: IFile;
  createdAt?: DateTime;
  updatedAt?: DateTime;
}
