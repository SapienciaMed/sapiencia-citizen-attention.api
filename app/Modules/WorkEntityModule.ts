declare module "@ioc:core.WorkEntityProvider" {
    import { IWorkEntityServices } from "App/Services/Contracts/IWorkEntityServices";

    const WorkEntityProvider: IWorkEntityServices;
    export default WorkEntityProvider;
}
