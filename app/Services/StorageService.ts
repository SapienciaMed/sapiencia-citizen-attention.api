import { Storage } from "@google-cloud/storage";
import { ApiResponse } from "App/Utils/ApiResponses";
import { IFiles } from "App/Interfaces/EstorageInterface";
import { IStorageService } from "./Contracts/IStorageService";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";


//const keyFilename = process.env.GCLOUD_KEYFILE;  //-->Local
const bucketName = process.env.GCLOUD_BUCKET ?? "";

export default class StorageService implements IStorageService{
    storage: Storage;

    constructor() {
        //this.storage = new Storage({ keyFilename }); //-->Local
        this.storage = new Storage();
    }
    

    public async getFiles(path?: string): Promise<ApiResponse<IFiles[]>> {
        const [files] = await this.storage.bucket(bucketName).getFiles({prefix: path});  
        const response = files.map(file => {
            const fileName = file.metadata.name?.split("/");
            return {
                name: fileName ? fileName[fileName.length - 1] : "",
                path: file.metadata.name ?? "",
                size: Number(file.metadata.size ?? 0),
                date: file.metadata.timeCreated ?? ""
            }
        });
        return new ApiResponse(response.filter(file => file.name), EResponseCodes.OK);
    }
}