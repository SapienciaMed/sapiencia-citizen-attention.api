import jwt from "jsonwebtoken";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";
import { IDecodedToken } from "App/Interfaces/AuthInterfaces";

export default class RecoveryPassword {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      const { tokenRecovery } = request.only(["tokenRecovery"]);

      if (!tokenRecovery) {
        return response.forbidden(
          new ApiResponse(
            null,
            EResponseCodes.FAIL,
            "No existe el token de seguridad para cambiar contraseña"
          )
        );
      }

      const { id } = jwt.verify(
        tokenRecovery,
        Env.get("BENEFACTOR_AUTH_KEY")
      ) as IDecodedToken;

      request["idUser"] = id;

      await next();
    } catch (error) {
      return response.forbidden(
        new ApiResponse(null, EResponseCodes.FAIL, String(error))
      );
    }
  }
}
