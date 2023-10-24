import { IUser } from "./UserInterfaces";

export interface IRequestSignIn {
  identification: string;
  password: string;
}

export interface IResponseSignIn {
  authorization: IAuthorization;
  token: string;
}

export interface IRequestToken {
  token: string;
}

export interface IResponseRefreshToken {
  identification: string;
  accessToken: string;
}

export interface IDecodedToken {
  id: number;
}

export interface IAuthorization {
  user: IUser;
  encryptedAccess: string;
}

export interface IRequestRecoveryPassword {
  identification: string;
  email: string;
}
