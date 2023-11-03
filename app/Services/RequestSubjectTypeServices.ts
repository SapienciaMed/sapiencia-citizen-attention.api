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
    let response: ApiResponse<IRequestSubjectType | null> = new ApiResponse(null, EResponseCodes.OK, "Tipo de asunto creado con éxito");
    const existRequestSubjectType = await this.RequestSubjectTypeRepository.getRequestSubjectTypeByName(requestSubjectType?.aso_asunto);
    if (existRequestSubjectType?.aso_codigo) {
      response.operation.message = "Ya existe un tipo de asunto con este nombre.";
      response.operation.title = "¡Asunto existente!";
      response.operation.code = EResponseCodes.FAIL
    }else{
      const res = await this.RequestSubjectTypeRepository.createRequestSubjectType(requestSubjectType);
      if (!res) {
        response.operation.message = "No se puede crear el tipo de asunto";
        response.operation.code = EResponseCodes.FAIL
      }else{
        response.data = res
      }
    }

    return response;
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
    let response: ApiResponse<IRequestSubjectType | null> = new ApiResponse(null, EResponseCodes.OK, "¡Asunto actualizado exitosamente!");
    const existRequestSubjectType = await this.RequestSubjectTypeRepository.getRequestSubjectTypeByName(requestSubjectType?.aso_asunto, requestSubjectType?.aso_codigo);
    if (existRequestSubjectType?.aso_codigo) {
      response.operation.message = "Ya existe un tipo de asunto con este nombre.";
      response.operation.title = "¡Asunto existente!";
      response.operation.code = EResponseCodes.FAIL
    }else{
      const res = await this.RequestSubjectTypeRepository.updateRequestSubjectType(requestSubjectType);
      if (!res) {
        response.operation.message = "No se puede actualizar el tipo de asunto";
        response.operation.code = EResponseCodes.FAIL
      }else{
        response.data = res
      }
    }

    return response;
  }
}
