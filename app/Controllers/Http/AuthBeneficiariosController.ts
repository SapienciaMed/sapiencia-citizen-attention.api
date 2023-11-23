import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import AuthProvider from "@ioc:core.AuthProvider";

import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

import AuthValidator from "App/Validators/AuthValidator";
import ChangePasswordValidator from "App/Validators/changePasswordValidator";

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
  public async changePassword({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(ChangePasswordValidator);
      return response.send(await AuthProvider.changePassword(data.password, data.token));
    } catch (err) {
      return response.badRequest(
        new ApiResponse(null, EResponseCodes.FAIL, String(err))
      );
    }
  }
}