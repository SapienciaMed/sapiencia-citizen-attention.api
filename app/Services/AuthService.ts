import jwt from "jsonwebtoken";

import Env from "@ioc:Adonis/Core/Env";
import Hash from "@ioc:Adonis/Core/Hash";

import IUserRepository from "App/Repositories/UserRepository";

import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";

import {
  IRequestSignIn,
  IResponseSignIn,
  IRequestToken,
  IResponseRefreshToken,
  IDecodedToken,
  IAuthorization,
} from "App/Interfaces/AuthInterfaces";

export interface IAuthService {
  signIn(
    signInData: IRequestSignIn
  ): Promise<ApiResponse<IResponseSignIn | null>>;
  refreshToken(
    dataRefreshToken: IRequestToken
  ): Promise<ApiResponse<IResponseRefreshToken | null>>;
  generateTokens(
    payload: object,
    secretKey: string,
    expires: string
  ): Promise<string>;
  getAuthorizationByToken(
    token: string
  ): Promise<ApiResponse<IAuthorization | null>>;
}

export default class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async signIn(
    signInData: IRequestSignIn
  ): Promise<ApiResponse<IResponseSignIn | null>> {
    const { identification, password } = signInData;
    const user = await this.userRepository.getUserByNumberDocument(
      identification
    );

    if (!user?.id) {
      return new ApiResponse(null, EResponseCodes.WARN, "Usuario no existe");
    }

    // Si user.password = null significa que no tiene una password en base de datos todavia
    const verifyPasswords = user.password 
    ? await Hash.verify(user.password, password) 
    : password === identification.substring(identification.length - 4)

    if (!verifyPasswords) {
      return new ApiResponse(
        null,
        EResponseCodes.WARN,
        "Credenciales invalidas"
      );
    }

    //delete user.password;

    const token = await this.generateTokens({
      id: user.id,
    });

    const auth: IResponseSignIn = {
      authorization: {
        encryptedAccess: "",
        user,
      },
      token,
    };

    return new ApiResponse(auth, EResponseCodes.OK);
  }

  async refreshToken(
    dataRefreshToken: IRequestToken
  ): Promise<ApiResponse<IResponseRefreshToken | null>> {
    const { token: refreshToken } = dataRefreshToken;

    const { id } = jwt.verify(
      refreshToken,
      Env.get("SECRET_REFRESH")
    ) as IDecodedToken;

    const user = await this.userRepository.getUserById(id);

    if (!user) {
      return new ApiResponse(null, EResponseCodes.WARN, "Usuario no existe");
    }

    const accessToken = await this.generateTokens({
      id: user.id,
    });

    const responseRefreshToken: IResponseRefreshToken = {
      identification: user.identification,
      accessToken,
    };

    return new ApiResponse(responseRefreshToken, EResponseCodes.OK);
  }

  async generateTokens(payload: object): Promise<string> {
    const secretKey = Env.get("BENEFACTOR_AUTH_KEY");
    const expires = "3600";
    const token = jwt.sign(payload, secretKey, { expiresIn: expires });

    return token;
  }

  async getAuthorizationByToken(
    token: string
  ): Promise<ApiResponse<IAuthorization | null>> {
    console.log(token);

    const { id } = jwt.verify(token, Env.get("AUTH_KEY")) as IDecodedToken;

    const user = await this.userRepository.getUserById(id);

    if (!user?.id) {
      return new ApiResponse(null, EResponseCodes.WARN, "Usuario no existe");
    }


    const toSend: IAuthorization = {
      encryptedAccess: "",
      user,
    };

    return new ApiResponse(toSend, EResponseCodes.OK);
  }

}

