//import { ItypeRequest } from "App/Interfaces/MasterTablesUtilityInterfaces"
import { ApiResponse } from "App/Utils/ApiResponses";

export interface IEmail {
  Emails: string[];
}

export interface IEmailService {
  responseEmail(email: string[], justification: string, filingNumber: number): Promise<ApiResponse<boolean | null>>;
  sendEmail(
    emails: string[],
    subject: string,
    body: string,
    attach?: {
      path: string;
      properties: {
        filename: string;
        contentDisposition: string;
      };
    }[]
  ): Promise<ApiResponse<boolean | null>>;
}
