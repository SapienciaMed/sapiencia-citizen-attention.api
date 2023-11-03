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
    const MasterTablesUtilityService = await import("App/Services/MasterTablesUtilityService");
    const PqrsdfService = await import("App/Services/PqrsdfServices");
    const WorkEntityService = await import("App/Services/WorkEntityServices");
    const AuthService = await import("App/Services/AuthService");
    const RequestSubjectTypeService = await import("App/Services/RequestSubjectTypeServices");
    const EmailService = await import("App/Services/emailService");

    /**************************************************************************/
    /************************ EXTERNAL SERVICES ********************************/
    /**************************************************************************/

    const GenericListsExternalService = await import("App/Services/External/GenericListsExternalService");
    const AuthExternalService = await import("App/Services/External/AuthExternalService");

    /**************************************************************************/
    /******************************** REPOSITORIES ****************************/
    /**************************************************************************/
    const UserRepository = await import("App/Repositories/UserRepository");
    const BusinessRepository = await import("App/Repositories/BusinessRepository");
    const DaysParametrizationRepository = await import("App/Repositories/DaysParametrizationRepository");
    const MasterTablesUtilityRepository = await import("App/Repositories/MasterTablesUtilityRepository");
    const PqrsdfRepository = await import("App/Repositories/PqrsdfRepository");
    const WorkEntityRepository = await import("App/Repositories/WorkEntityRepository");
    const RequestSubjectTypeRepository = await import("App/Repositories/RequestSubjectTypeRepository");

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
    this.app.container.singleton(
      "core.MasterTablesUtilityProvider",
      () => new MasterTablesUtilityService.default(new MasterTablesUtilityRepository.default())
    );
    this.app.container.singleton(
      "core.PqrsdfProvider",
      () => new PqrsdfService.default(new PqrsdfRepository.default(new GenericListsExternalService.default()))
    );
    this.app.container.singleton(
      "core.WorkEntityProvider",
      () => new WorkEntityService.default(new WorkEntityRepository.default(new AuthExternalService.default()))
    );
    this.app.container.singleton(
      "core.RequestSubjectTypeProvider",
      () => new RequestSubjectTypeService.default(new RequestSubjectTypeRepository.default())
    );
    this.app.container.singleton(
      "core.AuthProvider",
      () => new AuthService.default(new UserRepository.default())
    );
    this.app.container.singleton(
      "core.EmailProvider",
      () => new EmailService.default()
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
