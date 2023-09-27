import { IWorkEntityRepository } from "App/Repositories/Contracts/IWorkEntityRepository";
import { IWorkEntityServices } from "./Contracts/IWorkEntityServices";
import { IUser } from "App/Interfaces/UserInterfaces";
import { ApiResponse, IPagingData } from "App/Utils/ApiResponses";
import { IWorkEntityFilters, IWorkEntity } from "App/Interfaces/WorkEntityInterfaces";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IWorkEntityType } from "App/Interfaces/WorkEntityTypeInterface";

export default class WorkEntityServices implements IWorkEntityServices {
  constructor(private WorkEntityRepository: IWorkEntityRepository) {}

  public async getUserByDocument(identification: string): Promise<ApiResponse<IUser | null>> {
    const res = await this.WorkEntityRepository.getUserByDocument(identification);
    let response: ApiResponse<IUser | null> = new ApiResponse(res, EResponseCodes.OK);
    if (res?.id) {
      const existEntity = await this.WorkEntityRepository.getWorkEntityByUserId(res.id);
      if (existEntity) {
        response = new ApiResponse(
          {} as IWorkEntity,
          EResponseCodes.FAIL,
          "El usuario con este número de documento ya está asociado a otra entidad"
        );
      }
    } else {
      response = new ApiResponse(
        {} as IWorkEntity,
        EResponseCodes.FAIL,
        "El usuario no existe en el sistema Aurora, por favor gestionar su creación"
      );
    }

    return response;
  }

  public async getWorkEntityTypes(): Promise<ApiResponse<IWorkEntityType[]>> {
    const res = await this.WorkEntityRepository.getWorkEntityTypes();

    if (!res.length) {
      return new ApiResponse([] as IWorkEntityType[], EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getWorkEntityByFilters(
    filters: IWorkEntityFilters
  ): Promise<ApiResponse<IPagingData<IWorkEntity | null>>> {
    const res = await this.WorkEntityRepository.getWorkEntityByFilters(filters);

    if (!res.array.length) {
      return new ApiResponse(res, EResponseCodes.FAIL, "Registros no encontrados");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async getWorkEntityById(id: number): Promise<ApiResponse<IWorkEntity | null>> {
    const res = await this.WorkEntityRepository.getWorkEntityById(id);

    if (!res) {
      return new ApiResponse({} as IWorkEntity, EResponseCodes.FAIL, "Registro no encontrado");
    }

    return new ApiResponse(res, EResponseCodes.OK);
  }

  public async createWorkEntity(workEntity: IWorkEntity): Promise<ApiResponse<IWorkEntity | null>> {
    const res = await this.WorkEntityRepository.createWorkEntity(workEntity);
    if (!res) {
      return new ApiResponse({} as IWorkEntity, EResponseCodes.FAIL, "No se puede crear la entidad de trabajo");
    }
    return new ApiResponse(res, EResponseCodes.OK, "Entidad de trabajo creada con éxito");
  }

  public async updateWorkEntity(workEntity: IWorkEntity): Promise<ApiResponse<IWorkEntity | null>> {
    const res = await this.WorkEntityRepository.updateWorkEntity(workEntity);
    if (!res) {
      return new ApiResponse({} as IWorkEntity, EResponseCodes.FAIL, "No se puede actualizar la entidad de trabajo");
    }
    return new ApiResponse(res, EResponseCodes.OK, "Entidad de trabajo actualizada con éxito");
  }
}
