import jwt from "jsonwebtoken";

import Env from "@ioc:Adonis/Core/Env";
import Hash from "@ioc:Adonis/Core/Hash";
import Mail from "@ioc:Adonis/Addons/Mail";

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
  IRequestRecoveryPassword
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
  changePassword(
    password: string,
    token: string
  ): Promise<ApiResponse<IAuthorization | null>>;
  emailRecoveryPassword(
    recoveryPasswordData: IRequestRecoveryPassword
  ): Promise<ApiResponse<boolean | null>>;
  validateTokenRecoveryPassword(
    dataTokenRecovery: IRequestToken
  ): Promise<ApiResponse<IDecodedToken>>;

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
    const expires = "1d";
    const token = jwt.sign(payload, secretKey, { expiresIn: expires });

    return token;
  }

  async getAuthorizationByToken(
    token: string
  ): Promise<ApiResponse<IAuthorization | null>> {

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

  async changePassword(
    password: string,
    token: string
  ): Promise<ApiResponse<IAuthorization | null>> {

    const { id } = jwt.verify(token, Env.get("BENEFACTOR_AUTH_KEY")) as IDecodedToken;

    const user = await this.userRepository.getUserById(id);

    if (!user?.id) {
      return new ApiResponse(null, EResponseCodes.WARN, "Usuario no existe");
    }
    
    user.password = password;
    await this.userRepository.updateUserPassword(password, id)

    const toSend: IAuthorization = {
      encryptedAccess: "",
      user,
    };

    return new ApiResponse(toSend, EResponseCodes.OK);
  }

  async emailRecoveryPassword(
    recoveryPasswordData: IRequestRecoveryPassword
  ): Promise<ApiResponse<boolean | null>> {
    const { identification, email } = recoveryPasswordData;
    
    const user = await this.userRepository.getUserByNumberDocument(
      identification
    );

    if (!user) {
      return new ApiResponse(
        null,
        EResponseCodes.WARN,
        "El documento de identidad no se encuentra registrado en el sistema"
      );
    }

    if (user.email !== email) {
      return new ApiResponse(
        null,
        EResponseCodes.WARN,
        "Tu correo no coincide con el registrado en el sistema"
      );
    }

    const token = jwt.sign({ id: user.id }, Env.get("BENEFACTOR_AUTH_KEY"), {
      expiresIn: "15m",
    });

    await Mail.send((message) => {
      message
        .from("sapiencia@example.com")
        .to(user.email)
        .subject("Olvidaste tu contraseña,")
        .html(
          `
          <html>
            <head>
              <style>
              
              body {
                margin: 0;
                padding: 0;
                height: 100vh; 
                display: flex; 
                justify-content: center;
                align-items: center;
                background-color: #f0f0f0; 
              }
              
              .container {
                text-align: center;
                width: 640px;
              }
              
              .titulo {
                
                color: #533893;
                font-family: "RubikMedium", sans-serif;
              }
              
              .card { 
                padding: 10px;  
                align-items: center;
                background-color: #FAF9F9;
                width: 640px;
                height: 120px;
                flex-shrink: 0;
                border-radius: 22px;  
                font-family: "RubikMedium", sans-serif;
                font-size: 20px;
              }
              
              .text {
                font-size: 20px;
                font-family: "RubikMedium", sans-serif;
              
              }
              
              .tittle1 {  
                font-family: "RubikMedium", sans-serif;
                font-weight: bold;
                font-size: 20px;
              }
              
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #533893; 
                color: #ffffff !important; 
                border: none; 
                border-radius: 20px;  
                cursor: pointer; 
                font-size: 16px;                   
                text-align: center;
                font-family: "RubikMedium", sans-serif;
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                line-height: 120%;
                text-decoration: none;
              }
              
              .svg-container {
                float: left;   
              }
              
              .image-container {
                float: right;                       
              }
              @media (max-width: 768px) {
                .container {
                  padding: 10px; 
                }
              
                .svg-container,
                .image-container {
                  float: none; 
                  margin: 0; 
                  width: 100%; 
                }
              
                .svg-container {
                  margin-bottom: 10px;
                }
                .button {
                  font-size: 18px; 
                  color: #FFFFFF;
                }
              .logos-r{
                width: 150px;
                height: 50px;
              }
              
              }

              </style>
            </head>
            </html>
            <body>
              <div class="container">
                  <img src="https://i.pinimg.com/originals/32/50/86/3250868d03afce054d836c4ab1922124.png" alt="Logo" />
                      <h1 class="titulo">Hola, ${user.firstName} ${user.firstSurname}</h1>

                      <div class="card">
                          <p class="title1">Si quieres <b>cambiar tu contraseña,</b> has clic sobre el siguiente enlace:</p>           
                          <a class="button" href="${Env.get("URL_SITE")}portal/recuperacion-clave?user=${user.id}&token=${token}" target="_blank">Cambiar contraseña</a>
                      </div>

                      <p class="text">
                          Si no solicitaste recuperar tu contraseña o crees que alguien accedió a tu cuenta sin tu autorización, te
                          recomendamos que lo informes al administrador del sistema admonsistema@sapiencia.gov.co
                      </p>

                      <br>

                      <p class="text">
                          Por favor no respondas este correo, solo es informativo.
                      </p>

                      <div class="container">
                          <div class="svg-container">
                          <img class="logos-r" src="https://imagizer.imageshack.com/img923/2784/Q8iutZ.png" alt="" />
                          </div>
                          <div class="image-container">
                              <img src="https://imagizer.imageshack.com/img923/5295/gC0v0x.png" alt="">
                              <img src="https://imagizer.imageshack.com/img923/406/U0cQIv.png" alt="">
                          </div>
                      </div>
                </div>
              </body>
            `
        )
    });
    return new ApiResponse(true, EResponseCodes.OK);
  }
  async validateTokenRecoveryPassword(
    dataTokenRecovery: IRequestToken
  ): Promise<ApiResponse<IDecodedToken>> {
    const { token: tokenRecoveryPassword } = dataTokenRecovery;

    const { id } = jwt.verify(
      tokenRecoveryPassword,
      Env.get("BENEFACTOR_AUTH_KEY")
    ) as IDecodedToken;

    return new ApiResponse({ id } as IDecodedToken, EResponseCodes.OK);
  }
}