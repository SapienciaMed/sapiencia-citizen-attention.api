import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PqrsdfProvider from "@ioc:core.PqrsdfProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';

export default class PqrsdfsController {
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
      const filters  = request.body() as IPersonFilters;
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
      const { pqrsdf }  = request.body();
      return response.send(await PqrsdfProvider.createPqrsdf(pqrsdf));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

  public async uploadFile({ request, response }: HttpContextContract) {
    const files = request.files('files');
    const { id } = request.params();
    if(files) {
      const results = await Promise.all(
        files.map(async (file) => {
          if(file.tmpPath) {
            const fileUrl = await PqrsdfProvider.uploadFile(file);
            return fileUrl;
          } else {
            return false;
          }
        })
      );
      const filesFailed: MultipartFileContract[] = [];
      results.forEach((result, index) => {
        if(!result) filesFailed.push(files[index]);
      });
      if(filesFailed.length > 0) {
        const filesFailedStr = filesFailed.map(item => item.clientName);
        return response.badRequest(
          new ApiResponse(true, EResponseCodes.WARN, `No se pudieron guardar los siguientes archivos: ${filesFailedStr.join(",")}`)
        );
      } else {
        return response.send(
          new ApiResponse(true, EResponseCodes.OK, "¡Archivos guardados exitosamente!")
        );
      }
    } else {
      return response.badRequest(
        new ApiResponse(false, EResponseCodes.FAIL, "Sin archivos para cargar.")
      );
    }
  }

}
