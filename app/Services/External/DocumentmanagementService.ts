import Env from "@ioc:Adonis/Core/Env";
import { ApiResponse } from "App/Utils/ApiResponses";
import { IDocumentManagement, IRadicado } from "./Contracts/IDocumentManagementService";
import axios, { AxiosInstance } from "axios";

export default class DocumentManagementService implements IDocumentManagement {
  private apiCore: AxiosInstance;

  constructor() {
    this.apiCore = axios.create({
      baseURL: process.env.APP_API_DOCUMENT_MANAGEMENT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  public async getFilingNumber(code: string = "02"): Promise<ApiResponse<IRadicado>> {
    let type = "recibido";
    if (code == "03") {
      type = "externo";
    }
    const items = await this.apiCore.get<ApiResponse<IRadicado>>(`general-configuration/get-radicado-code/${type}`, {
      headers: {
        permissions: Env.get("CURRENT_PERMISSIONS"),
        Authorization: Env.get("CURRENT_AUTHORIZATION"),
      },
    });

    return items.data;
  }

  public async putFilingNumber(radicado: number): Promise<ApiResponse<IRadicado>> {
    const items = await this.apiCore.put<ApiResponse<IRadicado>>(
      `general-configuration/update-radicado-code/recibido`,
      { radicado: radicado },
      {
        headers: {
          permissions: Env.get("CURRENT_PERMISSIONS"),
          Authorization: Env.get("CURRENT_AUTHORIZATION"),
        },
      }
    );

    return items.data;
  }
}
