import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IPerson, IPersonFilters } from "App/Interfaces/PersonInterfaces";
import {
  IPqrsdf,
  IPqrsdfFilters,
  IPqrsdfResponse,
  IReopenRequest,
  IrequestPqrsdf,
} from "App/Interfaces/PqrsdfInterfaces";
import { IPqrsdfRepository } from "App/Repositories/Contracts/IPqrsdfRepository";
import { ApiResponse, IPagination, IPagingData } from "App/Utils/ApiResponses";
import { IPqrsdfServices } from "./Contracts/IPqrsdfServices";

export default class PqrsdfServices implements IPqrsdfServices {
  constructor(private PqrsdfRepository: IPqrsdfRepository) {}

  async getPqrsdfByFilters(filters: IPqrsdfFilters): Promise<ApiResponse<IPagingData<IPqrsdf>>> {
    const res = await this.PqrsdfRepository.getPqrsdfByFilters(filters);
    return new ApiResponse(res, EResponseCodes.OK);
  }

  async getPqrsdfResponnses(pagination: IPagination): Promise<ApiResponse<IPagingData<IPqrsdfResponse | null>>> {
    const res = await this.PqrsdfRepository.getPqrsdfResponnses(pagination);

    if (!res.array.length) {
      return new ApiResponse(res, EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async createResponse(
    prsdf: IPqrsdf,
    file: MultipartFileContract,
    supportFiles: MultipartFileContract[] = []
  ): Promise<ApiResponse<IPqrsdf | null>> {
    const res = await this.PqrsdfRepository.createResponse(prsdf, file, supportFiles);
    if (!res) {
      return new ApiResponse({} as IPqrsdf, EResponseCodes.FAIL, "No se puede crear la respuesta de la PQRSDF");
    }
    return new ApiResponse(res, EResponseCodes.OK, "Respuesta de PQRSDF creada con éxito");
  }

  public async createPqrsdf(
    prsdf: IPqrsdf,
    file: MultipartFileContract,
    filedNumber: number
  ): Promise<ApiResponse<IPqrsdf | null>> {
    const res = await this.PqrsdfRepository.createPqrsdf(prsdf, file, filedNumber);
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
    const res = await this.PqrsdfRepository.uploadFile(file);

    if (!res) {
      return new ApiResponse({} as boolean, EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getPqrsdfByRequest(filters: IrequestPqrsdf): Promise<ApiResponse<IPqrsdf[]>> {
    const res = await this.PqrsdfRepository.getPqrsdfByRequest(filters);

    if (!res) {
      return new ApiResponse([] as IPqrsdf[], EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async createRequestReopen(justification: IReopenRequest): Promise<ApiResponse<IReopenRequest | null>> {
    const res = await this.PqrsdfRepository.createRequestReopen(justification);
    if (!res) {
      return new ApiResponse({} as IReopenRequest, EResponseCodes.FAIL, "No se pue        de crear la solicitud");
    }
    return new ApiResponse(res, EResponseCodes.OK, "Solicitud creada con éxito");
  }
}
