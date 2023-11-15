import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import StorageProvider from "@ioc:core.StorageProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { ApiResponse } from "App/Utils/ApiResponses";

export default class StorageController {
    public async getFile({ response }: HttpContextContract) {
        try {
            return response.send(await StorageProvider.getFiles("https://storage.cloud.google.com/sapiencia-citizen-attention/proyectos-digitales/test2.pdf"));
        } catch (err) {
            return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
        }
    }
}
