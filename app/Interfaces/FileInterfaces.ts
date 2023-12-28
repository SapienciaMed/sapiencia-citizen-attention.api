import { DateTime } from "luxon";
import { IPqrsdf } from "./PqrsdfInterfaces";
import { IUser } from "./UserInterfaces";

export interface IFile {
  id?: number;
  name: string;
  filePath?: string;
  visiblePetitioner?: boolean;
  userId?: number;
  user?: IUser;
  isActive: boolean;
}

export interface ISupportFiles {
  id?: number;
  pqrsdfId?: number;
  fileId?: number;
  visiblePetitioner?: boolean;
  userId?: number;
  file?: IFile;
  pqrsdf?: IPqrsdf;
  createdAt?: DateTime;
}
