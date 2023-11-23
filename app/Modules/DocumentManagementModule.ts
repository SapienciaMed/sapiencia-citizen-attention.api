declare module "@ioc:core.DocumentManagementProvider"{
    import { IDocumentManagement } from "App/Services/External/Contracts/IDocumentManagementService";

    const DocumentManagementProvider:IDocumentManagement;
    export default DocumentManagementProvider;
}