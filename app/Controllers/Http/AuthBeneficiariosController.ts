import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import AuthProvider from "@ioc:core.AuthProvider";

import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

import AuthValidator from "App/Validators/AuthValidator";

export default class AuthController {
  public async signIn({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(AuthValidator);
      return response.send(await AuthProvider.signIn(data));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}