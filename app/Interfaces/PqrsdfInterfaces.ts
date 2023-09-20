import { DateTime } from "luxon";
import { IPerson } from "./PersonInterfaces";
import { IResponseMedium } from "./ResponseMediumInterfaces";
import { IRequestSubject } from "./RequestSubjectInterfaces";
import { IFile } from "./FileInterfaces";
import { IRequestType } from "./RequestTypeInterfaces";

export interface IPqrsdf {
  id: number;
  requestTypeId: number;
  personId: number;
  responseMediumId: number;
  requestSubjectId: number;
  fileId: number;
  clasification: string;
  dependency: string;
  description: string;
  requestType?: IRequestType;
  person?: IPerson;
  responseMedium?: IResponseMedium;
  requestSubject?: IRequestSubject;
  file?: IFile;
  createdAt: DateTime;
  updatedAt: DateTime;
}
