import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import {
  IAttentionRequestType,
  ICitizenAttention,
  ICitizenAttentionFilters,
  ICorregimiento,
  IServiceChannel,
  IValueGroup,
} from "App/Interfaces/CitizenAttentionInterfaces";
import { ICitizenAttentionRepository } from "App/Repositories/Contracts/ICitizenAttentionRepository";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { ICitizenAttentionServices } from "./Contracts/ICitizenAttentionServices";
import { IDependence } from "App/Interfaces/DependenceInterfaces";
import { IProgram } from "App/Interfaces/ProgramInterfaces";
import { IRequestSubjectType } from "App/Interfaces/RequestSubjectTypeInterfaces";
import { IGenericData } from "App/Interfaces/GenericDataInterfaces";
import { IRequestType } from "App/Interfaces/RequestTypeInterfaces";
import { ILegalEntityType } from "App/Interfaces/LegalEntityTypeInterfaces";
import { IResponseMedium } from "App/Interfaces/ResponseMediumInterfaces";
import { IResponseType } from "App/Interfaces/ResponseTypeInterfaces";

export default class CitizenAttentionServices implements ICitizenAttentionServices {
  constructor(private CitizenAttentionRepository: ICitizenAttentionRepository) {}

  public async createCitizenAttention(
    citizenAttention: ICitizenAttention
  ): Promise<ApiResponse<ICitizenAttention | null>> {
    const res = await this.CitizenAttentionRepository.createCitizenAttention(citizenAttention);
    if (!res) {
      return new ApiResponse(
        {} as ICitizenAttention,
        EResponseCodes.FAIL,
        "No se puede registrar la atención ciudadana"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK, "Atención ciudadana registrada con éxito");
  }

  public async getAttentionRequestTypes(): Promise<ApiResponse<IAttentionRequestType[]>> {
    const res = await this.CitizenAttentionRepository.getAttentionRequestTypes();
    if (!res.length) {
      return new ApiResponse([] as IAttentionRequestType[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getCorregimientos(): Promise<ApiResponse<ICorregimiento[]>> {
    const res = await this.CitizenAttentionRepository.getCorregimientos();
    if (!res.length) {
      return new ApiResponse([] as ICorregimiento[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getDependencies(): Promise<ApiResponse<IDependence[]>> {
    const res = await this.CitizenAttentionRepository.getDependencies();
    if (!res.length) {
      return new ApiResponse([] as IDependence[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getStratums(): Promise<ApiResponse<IGenericData[]>> {
    const res = await this.CitizenAttentionRepository.getStratums();
    if (!res.length) {
      return new ApiResponse([] as IGenericData[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getCountries(): Promise<ApiResponse<IGenericData[]>> {
    const res = await this.CitizenAttentionRepository.getCountries();
    if (!res.length) {
      return new ApiResponse([] as IGenericData[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getDepartments(countryId?: number): Promise<ApiResponse<IGenericData[]>> {
    const res = await this.CitizenAttentionRepository.getDepartments(countryId);
    if (!res.length) {
      return new ApiResponse([] as IGenericData[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getMunicipalities(departmentId?: number): Promise<ApiResponse<IGenericData[]>> {
    const res = await this.CitizenAttentionRepository.getMunicipalities(departmentId);
    if (!res.length) {
      return new ApiResponse([] as IGenericData[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getPrograms(): Promise<ApiResponse<IProgram[]>> {
    const res = await this.CitizenAttentionRepository.getPrograms();
    if (!res.length) {
      return new ApiResponse([] as IProgram[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getResponseMediums(): Promise<ApiResponse<IResponseMedium[]>> {
    const res = await this.CitizenAttentionRepository.getResponseMediums();
    if (!res.length) {
      return new ApiResponse([] as IResponseMedium[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getResponseTypes(): Promise<ApiResponse<IResponseType[]>> {
    const res = await this.CitizenAttentionRepository.getResponseTypes();
    if (!res.length) {
      return new ApiResponse([] as IResponseType[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getRequestTypes(): Promise<ApiResponse<IRequestType[]>> {
    const res = await this.CitizenAttentionRepository.getRequestTypes();
    if (!res.length) {
      return new ApiResponse([] as IRequestType[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getLegalEntityTypes(): Promise<ApiResponse<ILegalEntityType[]>> {
    const res = await this.CitizenAttentionRepository.getLegalEntityTypes();
    if (!res.length) {
      return new ApiResponse([] as ILegalEntityType[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getRequestSubjectTypes(): Promise<ApiResponse<IRequestSubjectType[]>> {
    const res = await this.CitizenAttentionRepository.getRequestSubjectTypes();
    if (!res.length) {
      return new ApiResponse([] as IRequestSubjectType[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getSeviceChannels(): Promise<ApiResponse<IServiceChannel[]>> {
    const res = await this.CitizenAttentionRepository.getSeviceChannels();
    if (!res.length) {
      return new ApiResponse([] as IServiceChannel[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getValueGroups(): Promise<ApiResponse<IValueGroup[]>> {
    const res = await this.CitizenAttentionRepository.getValueGroups();
    if (!res.length) {
      return new ApiResponse([] as IValueGroup[], EResponseCodes.FAIL, "Registros no encontrados");
    }
    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getCitizenAttentionByFilters(
    filters: ICitizenAttentionFilters
  ): Promise<ApiResponse<IPagingData<ICitizenAttention | null>>> {
    const res = await this.CitizenAttentionRepository.getCitizenAttentionByFilters(filters);

    if (!res.array.length) {
      return new ApiResponse(res, EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getCitizenAttentionById(id: number): Promise<ApiResponse<ICitizenAttention | null>> {
    const res = await this.CitizenAttentionRepository.getCitizenAttentionById(id);

    if (!res) {
      return new ApiResponse({} as ICitizenAttention, EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async updateCitizenAttention(
    citizenAttention: ICitizenAttention
  ): Promise<ApiResponse<ICitizenAttention | null>> {
    const res = await this.CitizenAttentionRepository.updateCitizenAttention(citizenAttention);
    if (!res) {
      return new ApiResponse(
        {} as ICitizenAttention,
        EResponseCodes.FAIL,
        "No se puede actualizar la atención ciudadana"
      );
    }
    return new ApiResponse(res, EResponseCodes.OK, "Atención ciudadana actualizada con éxito");
  }
}
