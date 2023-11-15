declare module "@ioc:core.StorageProvider" {
    import { IStorageService } from "App/Services/Contracts/IStorageService";

    const StorageProvider: IStorageService;
    export default StorageProvider;
}