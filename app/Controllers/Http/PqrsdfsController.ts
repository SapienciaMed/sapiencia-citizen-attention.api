import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PqrsdfProvider from "@ioc:core.PqrsdfProvider";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import { ApiResponse } from "App/Utils/ApiResponses";

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
    const archivo = request.file('archivo');

    console.log(archivo);
    
    if (!archivo) {
      return response.status(400).send('No se ha enviado ningún archivo.');
    }

    try {
      return response.send(await PqrsdfProvider.uploadFile(archivo));
    } catch (err) {
      return response.badRequest(new ApiResponse(null, EResponseCodes.FAIL, String(err)));
    }
  }

}
