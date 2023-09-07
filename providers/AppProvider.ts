import type { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class AppProvider {
    constructor(protected app: ApplicationContract) {}

    public async register() {
        // Register your own bindings

        /**************************************************************************/
        /******************************** SERVICES ********************************/
        /**************************************************************************/
        const BusinessService = await import("App/Services/BusinessService");
        const DaysParametrizationService = await import("App/Services/DaysParametrizationService");

        /**************************************************************************/
        /************************ EXTERNAL SERVICES ********************************/
        /**************************************************************************/

        /**************************************************************************/
        /******************************** REPOSITORIES ****************************/
        /**************************************************************************/
        const BusinessRepository = await import("App/Repositories/BusinessRepository");

        const DaysParametrizationRepository = await import("App/Repositories/DaysParametrizationRepository");

        /**************************************************************************/
        /******************************** CORE  ***********************************/
        /**************************************************************************/

        this.app.container.singleton(
            "core.BusinessProvider",
            () => new BusinessService.default(new BusinessRepository.default())
        );
        this.app.container.singleton(
            "core.DaysParametrizationProvider",
            () => new DaysParametrizationService.default(new DaysParametrizationRepository.default())
        );
    }

    public async boot() {
        // IoC container is ready
    }

    public async ready() {
        // App is ready
    }

    public async shutdown() {
        // Cleanup, since app is going down
    }
}
