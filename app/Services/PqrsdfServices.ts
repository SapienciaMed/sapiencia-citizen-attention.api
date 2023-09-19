import { ApiResponse } from "App/Utils/ApiResponses";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import { IPqrsdfServices } from "./Contracts/IPqrsdfServices";
import { IPqrsdfRepository } from "App/Repositories/Contracts/IPqrsdfRepository";

export default class PresdfServices implements IPqrsdfServices {
  
    constructor( private PqrsdfRepository: IPqrsdfRepository ){}

}
