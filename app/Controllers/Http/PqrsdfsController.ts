import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import jwt from "jsonwebtoken";
import Env from "@ioc:Adonis/Core/Env";
import PqrsdfProvider from "@ioc:core.PqrsdfProvider";
import DocumentManagementProvider from "@ioc:core.DocumentManagementProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { IrequestPqrsdf } from "App/Interfaces/PqrsdfInterfaces";
import PqrsdfFiltersValidator from "App/Validators/PqrsdfFiltersValidator";
import EmailProvider from "@ioc:core.EmailProvider";

export default class PqrsdfsController {
  public async getPqrsdfPaginated({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(PqrsdfFiltersValidator);
      return response.send(await PqrsdfProvider.getPqrsdfPaginated(data));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getPrsdfById({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params();
      return response.send(await PqrsdfProvider.getPrsdfById(id));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getPersonByDocument({ request, response }: HttpContextContract) {
    try {
      const { identification } = request.params();
      return response.send(await PqrsdfProvider.getPersonByDocument(identification));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async updatePerson({ request, response }: HttpContextContract) {
    try {
      const person = request.all() as IPerson;
      return response.send(await PqrsdfProvider.updatePerson(person));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getPeopleByFilters({ request, response }: HttpContextContract) {
    try {
      const filters = request.body() as IPersonFilters;
      return response.send(await PqrsdfProvider.getPeopleByFilters(filters));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async getPqrsdfByIdentificationAndFilingNumber({ request, response }: HttpContextContract) {
    try {
      const { identification, filingNumber } = request.all();
      return response.send(await PqrsdfProvider.getPqrsdfByIdentificationAndFilingNumber(identification, filingNumber));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async createPqrsdf({ request, response }: HttpContextContract) {
    try {

      const respon = await DocumentManagementProvider.getNumberRadicado();
      const radicado = respon.data;
      const radicadoToString = radicado.toString();
      const dataString = radicadoToString.slice(0,4);
      const addnumbeTodata = dataString.padEnd(5,'02')
      const numberRadicado = parseInt( `${addnumbeTodata}${radicadoToString.slice(5)}`) + 1 ;
      
      await DocumentManagementProvider.putNumberRadicado(numberRadicado)

      const files = request.files("files");
      const { pqrsdf } = request.body();
      const dataPqrsdf = JSON.parse(pqrsdf);
      
      return response.send(await PqrsdfProvider.createPqrsdf(dataPqrsdf, files[0],numberRadicado));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async uploadFile({ request, response }: HttpContextContract) {
    const files = request.files("files");

    if (files) {
      const results = await Promise.all(
        files.map(async (file) => {
          if (file.tmpPath) {
            const fileUrl = await PqrsdfProvider.uploadFile(file);
            return fileUrl;
          } else {
            return false;
          }
        })
      );
      const filesFailed: MultipartFileContract[] = [];
      results.forEach((result, index) => {
        if (!result) filesFailed.push(files[index]);
      });
      if (filesFailed.length > 0) {
        const filesFailedStr = filesFailed.map((item) => item.clientName);
        return response.badRequest(
          new ApiResponse(
            true,
            EResponseCodes.WARN,
            `No se pudieron guardar los siguientes archivos: ${filesFailedStr.join(",")}`
          )
        );
      } else {
        return response.send(new ApiResponse(true, EResponseCodes.OK, "¡Archivos guardados exitosamente!"));
      }
    } else {
      return response.badRequest(new ApiResponse(false, EResponseCodes.FAIL, "Sin archivos para cargar."));
    }
  }

  public async getPqrsdfByRequest({ request, response }: HttpContextContract) {
    const req = request.headers();
    const key = Env.get("APP_KEY");

    const token = req.authorization?.replace("Bearer ", "");

    const { id } = jwt.verify(token!, key) as { id: number; document: string };

    const filters = request.body() as IrequestPqrsdf;
    filters.userId = id;
    try {
      return response.send(await PqrsdfProvider.getPqrsdfByRequest(filters));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async createRequestReopen({ request, response }: HttpContextContract) {
    try {
      const { justification } = request.body();
      await EmailProvider.responseEmail(
        ["ltangarife@i4digital.com"],
        justification[0].srb_justificacion,
        justification[1]["radicado"]
      );
      return response.send(await PqrsdfProvider.createRequestReopen(justification));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async pruebaRadicado({ response }: HttpContextContract) {  
    try {

      const respon = await DocumentManagementProvider.getNumberRadicado()
      const radicado = respon.data;
      const radicadoToString = radicado.toString();
      const dataString = radicadoToString.slice(0,4);
      const addnumbeTodata = dataString.padEnd(5,'2')
      const numberRadicado = parseInt( `${addnumbeTodata}${radicadoToString.slice(5)}`) + 1 ;


      return response.send(numberRadicado);
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }
}
