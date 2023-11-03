//import { ItypeRequest } from "App/Interfaces/MasterTablesUtilityInterfaces"
import { ApiResponse } from "App/Utils/ApiResponses"

export interface IEmail {
    Emails: string[]
  }

export interface IEmailService {
    responseEmail(email:string[],justification:string): Promise<ApiResponse<boolean | null>>
}
