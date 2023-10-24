import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IPqrsdfServices } from "./Contracts/IPqrsdfServices";
import { IPqrsdfRepository } from "App/Repositories/Contracts/IPqrsdfRepository";
import { IPqrsdf } from "App/Interfaces/PqrsdfInterfaces";
import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';

export default class PqrsdfServices implements IPqrsdfServices {
  constructor(private PqrsdfRepository: IPqrsdfRepository) {}

  public async createPqrsdf(prsdf: IPqrsdf): Promise<ApiResponse<IPqrsdf | null>> {
    const res = await this.PqrsdfRepository.createPqrsdf(prsdf);
    if (!res) {
      return new ApiResponse({} as IPqrsdf, EResponseCodes.FAIL, "No se puede crear la PQRSDF");
    }
    return new ApiResponse(res, EResponseCodes.OK, "PQRSDF creada con éxito");
  }

  public async getPrsdfById(id: number): Promise<ApiResponse<IPqrsdf | null>> {
    const res = await this.PqrsdfRepository.getPqrsdfById(id);

    if (!res) {
      return new ApiResponse({} as IPqrsdf, EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getPersonByDocument(identification: number): Promise<ApiResponse<IPerson | null>> {
    const res = await this.PqrsdfRepository.getPersonByDocument(identification);
    if (!res) {
      return new ApiResponse({} as IPerson, EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getPeopleByFilters(filters: IPersonFilters): Promise<ApiResponse<IPagingData<IPerson | null>>> {
    const res = await this.PqrsdfRepository.getPeopleByFilters(filters);

    if (!res.array.length) {
      return new ApiResponse(res, EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async updatePerson(person: IPerson): Promise<ApiResponse<IPerson | null>> {
    const res = await this.PqrsdfRepository.updatePerson(person);
    if (!res) {
      return new ApiResponse({} as IPerson, EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getPqrsdfByIdentificationAndFilingNumber(
    identification: number,
    filingNumber: number
  ): Promise<ApiResponse<IPqrsdf | null>> {
    const res = await this.PqrsdfRepository.getPqrsdfByIdentificationAndFilingNumber(identification, filingNumber);

    if (!res) {
      return new ApiResponse({} as IPqrsdf, EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async uploadFile(file: MultipartFileContract): Promise<ApiResponse<boolean>> {
    const res = await this.PqrsdfRepository.uploadFile(file)

    if (!res) {
      return new ApiResponse({} as boolean, EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }
}
