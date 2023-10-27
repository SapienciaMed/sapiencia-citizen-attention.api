import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IRequestObject,
  IRequestSubjectType,
  IRequestSubjectTypeFilters,
} from "App/Interfaces/RequestSubjectTypeInterfaces";
import { IRequestSubjectTypeRepository } from "App/Repositories/Contracts/IRequestSubjectTypeRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { IRequestSubjectTypeServices } from "./Contracts/IRequestSubjectTypeServices";

export default class RequestSubjectTypeServices implements IRequestSubjectTypeServices {
  constructor(private RequestSubjectTypeRepository: IRequestSubjectTypeRepository) {}

  public async createRequestSubjectType(
    requestSubjectType: IRequestSubjectType
  ): Promise<ApiResponse<IRequestSubjectType | null>> {
    const res = await this.RequestSubjectTypeRepository.createRequestSubjectType(requestSubjectType);
    if (!res) {
      return new ApiResponse({} as IRequestSubjectType, EResponseCodes.FAIL, "No se puede crear el tipo de asunto");
    }
    return new ApiResponse(res, EResponseCodes.OK, "Tipo de asunto creado con éxito");
  }

  public async getRequestObjects(): Promise<ApiResponse<IRequestObject[]>> {
    const res = await this.RequestSubjectTypeRepository.getRequestObjects();
    if (!res.length) {
      return new ApiResponse([] as IRequestObject[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getRequestSubjectTypeByFilters(
    filters: IRequestSubjectTypeFilters
  ): Promise<ApiResponse<IPagingData<IRequestSubjectType | null>>> {
    const res = await this.RequestSubjectTypeRepository.getRequestSubjectTypeByFilters(filters);

    if (!res.array.length) {
      return new ApiResponse(res, EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getRequestSubjectTypeById(id: number): Promise<ApiResponse<IRequestSubjectType | null>> {
    const res = await this.RequestSubjectTypeRepository.getRequestSubjectTypeById(id);

    if (!res) {
      return new ApiResponse({} as IRequestSubjectType, EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async updateRequestSubjectType(requestSubjectType: IRequestSubjectType): Promise<ApiResponse<IRequestSubjectType | null>> {
    const res = await this.RequestSubjectTypeRepository.updateRequestSubjectType(requestSubjectType);
    if (!res) {
      return new ApiResponse({} as IRequestSubjectType, EResponseCodes.FAIL, "No se puede actualizar el tipo de asunto");
    }
    return new ApiResponse(res, EResponseCodes.OK, "Tipo de asunto actualizado con éxito");
  }
}
