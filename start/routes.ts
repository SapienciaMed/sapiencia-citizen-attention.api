/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return "Api atención ciudadana de SAPIENCIA";
});

Route.group(() => {
  Route.get("/get-countries", "CitizenAttentionController.getCountries");
  Route.get("/get-programs", "CitizenAttentionController.getPrograms");
  Route.get("/get-departments", "CitizenAttentionController.getDepartments");
  Route.get("/get-municipalities", "CitizenAttentionController.getMunicipalities");
  Route.get("/get-corregimientos", "CitizenAttentionController.getCorregimientos");
})
  .prefix("/api/v1/citizen-attention")
  .middleware("userOrBenefactor");

Route.group(() => {
  Route.get("get-person-by-document/:identification", "PqrsdfsController.getPersonByDocument");
  Route.post("create", "PqrsdfsController.createPqrsdf");
  Route.post("upload", "PqrsdfsController.uploadFile");
})
  .prefix("/api/v1/pqrsdf/")
  .middleware("userOrBenefactor");

Route.group(() => {
  Route.group(() => {
    Route.get("/get-by-id/:id", "BusinessController.getBusinessById");
  }).prefix("/business");

  /* Parametrización de días */
  Route.group(() => {
    Route.get("/get-day-types", "DaysParametrizationController.getDayTypes");
    Route.get("/get-all", "DaysParametrizationController.getDaysParametrizations");
    Route.post("/create", "DaysParametrizationController.createDaysParametrization");
    Route.post("/update", "DaysParametrizationController.updateDaysParametrization");
    Route.get("/get-by-id/:id", "DaysParametrizationController.getDaysParametrizationById");
  }).prefix("/day-parametrization");
  /* Tipos de asuntos de solicitud */
  Route.group(() => {
    Route.get("/get-by-id/:id", "RequestSubjectTypeController.getRequestSubjectTypeById").middleware(
      "auth:TIPO_DE_ASUNTO_CONSULTAR"
    );
    Route.post("/get-by-filters", "RequestSubjectTypeController.getRequestSubjectTypeByFilters").middleware(
      "auth:TIPO_DE_ASUNTO_CONSULTAR"
    );
    Route.get("/get-request-objects", "RequestSubjectTypeController.getRequestObjects");
    Route.post("/create", "RequestSubjectTypeController.createRequestSubjectType").middleware(
      "auth:TIPO_DE_ASUNTO_CREAR"
    );
    Route.post("/update", "RequestSubjectTypeController.updateRequestSubjectType").middleware(
      "auth:TIPO_DE_ASUNTO_EDITAR"
    );
  }).prefix("/request-subject-type");
  /* PQRSDF */
  Route.group(() => {
    Route.post("/get-paginated", "PqrsdfsController.getPqrsdfByFilters");
    Route.post("/get-responses", "PqrsdfsController.getPqrsdfResponnses");
    Route.post("/create-request-reopen", "PqrsdfsController.createRequestReopen");
    Route.get("/get-by-id/:id", "PqrsdfsController.getPrsdfById");
    Route.post("/get-people-by-filters", "PqrsdfsController.getPeopleByFilters");
    Route.get("/get-by-filters", "PqrsdfsController.getPqrsdfByIdentificationAndFilingNumber");
    Route.post("/update-person", "PqrsdfsController.updatePerson");
    Route.post("/get-request-by-filters", "PqrsdfsController.getPqrsdfByRequest");
    Route.post("/response", "PqrsdfsController.createResponse");
  }).prefix("/pqrsdf");

  /* Citizen attentions */
  Route.group(() => {
    Route.get("/get-stratums", "CitizenAttentionController.getStratums");
    Route.post("/update", "CitizenAttentionController.updateCitizenAttention");
    Route.get("/get-value-groups", "CitizenAttentionController.getValueGroups");
    Route.get("/get-dependencies", "CitizenAttentionController.getDependencies");
    Route.get("/get-by-id", "CitizenAttentionController.getCitizenAttentionById");
    Route.get("/get-request-types", "CitizenAttentionController.getRequestTypes");
    Route.get("/get-document-type", "ListadoGenericosController.getDocumentType");
    Route.get("/get-response-types", "CitizenAttentionController.getResponseTypes");
    Route.get("/get-sevice-channels", "CitizenAttentionController.getSeviceChannels");
    Route.get("/get-response-mediums", "CitizenAttentionController.getResponseMediums");
    Route.get("/get-legal-entity-types", "CitizenAttentionController.getLegalEntityTypes");
    Route.post("/get-by-filters", "CitizenAttentionController.getCitizenAttentionByFilters");
    Route.get("/get-request-subject-types", "CitizenAttentionController.getRequestSubjectTypes");
    Route.get("/get-attention-request-types", "CitizenAttentionController.getAttentionRequestTypes");
    Route.post("/create", "CitizenAttentionController.createCitizenAttention").middleware(
      "auth:ATENCION_CIUDADANA_CREAR"
    );
  }).prefix("/citizen-attention");

  /* Work entities */
  Route.group(() => {
    Route.post("/create", "WorkEntityController.createWorkEntity").middleware("auth:ENTIDADES_TRABAJO_CREAR");
    Route.post("/update", "WorkEntityController.updateWorkEntity").middleware("auth:ENTIDADES_TRABAJO_EDITAR");
    Route.get("/get-types", "WorkEntityController.getWorkEntityTypes");
    Route.get("/get-programs", "WorkEntityController.getProgramsAffairs");
    Route.get("/get-by-id/:id", "WorkEntityController.getWorkEntityById").middleware(
      "auth:ENTIDADES_TRABAJO_CONSULTAR"
    );
    Route.post("/get-by-filters", "WorkEntityController.getWorkEntityByFilters").middleware(
      "auth:ENTIDADES_TRABAJO_CONSULTAR"
    );
    Route.post("/get-user-by-filters", "WorkEntityController.getUserByFilters").middleware(
      "auth:ENTIDADES_TRABAJO_CONSULTAR"
    );
    Route.get("/get-user-by-document/:identification", "WorkEntityController.getUserByDocument").middleware(
      "auth:ENTIDADES_TRABAJO_CONSULTAR"
    );
    Route.get("/get-entitymanagers-by-entityType-id/:id", "WorkEntityController.getEntityManagersByEntityTypeId");
    Route.get("/get-by-user-id/:id", "WorkEntityController.getWorkEntityByUserId").middleware(
      "auth:ENTIDADES_TRABAJO_CONSULTAR"
    );
  }).prefix("/work-entity");

  /*ARCHIVOS*/
  Route.group(() => {
    Route.get("get-file", "StorageController.getFile");
  }).prefix("file");
})
  .prefix("/api/v1/")
  .middleware("auth");

/**************************
 ******TABLAS MAESTRAS******
 **************************/
/* TABLAS MAESTRAS */
Route.group(() => {
  Route.get("/request-types", "MasterTablesUtilitiesController.getRequestTypes");
  Route.get("/document-types", "MasterTablesUtilitiesController.getDocumentTypes");
  Route.get("/channel-attention", "MasterTablesUtilitiesController.getTensionChannels");
  Route.get("/channel-attention-details/:id", "MasterTablesUtilitiesController.getAttentionChannelsDetails");
  Route.get("/get-type-legal-entity", "MasterTablesUtilitiesController.getTypeLegalEntity");
  Route.get("/get-Response-type", "MasterTablesUtilitiesController.getTypeResponsePqrsdf");
  Route.get("/get-factors", "MasterTablesUtilitiesController.getFactors");
  Route.get("/requestSubject", "MasterTablesUtilitiesController.getRequestSubject");
}).prefix("/api/v1/utility");

Route.group(() => {
  Route.get("/get-Programs", "ProgramasController.getPrograms");
  Route.get("/get-paises", "ListadoGenericosController.getPaises");
  Route.get("/get-solicitudes", "AsuntoSolicitudsController.asuntoSolicitud");
  Route.get("/get-municipios/:id", "ListadoGenericosController.getMunicipios");
  Route.get("/get-departamentos", "ListadoGenericosController.getDepartamentos");
  Route.get("/get-type-docuement", "ListadoGenericosController.getDocumentType");
  Route.get("/get-listaParametros", "ListaParametrosController.getListaParametros");
  Route.get("/get-type-solicituds", "TsoTipoSolicitudsController.getTipoSolicitudes");
  Route.get("/get-response-medium", "MedioDeRespuestasController.getMedioDeRespuesta");
  Route.get("/get-objecto-solicitud", "ObjectoSolicitudsController.getObjectoSolicitud");
  Route.get("/get-legal-entity", "TipoEntidadJuridicasController.getTypeEntidadJuridica");
});

// *************************************************************************
// ************************* ROUTES Auth ***********************************
// *************************************************************************

Route.group(() => {
  Route.post("/signin", "AuthBeneficiariosController.signIn");
  Route.put("/change-password", "AuthBeneficiariosController.changePassword");
  Route.post("/recovery-password", "AuthBeneficiariosController.emailRecoveryPassword");
  Route.post("/validate-token-recovery", "AuthBeneficiariosController.validateTokenRecoveryPassword");
  Route.post("/change-password-recovery", "AuthBeneficiariosController.changePassword").middleware("recoveryPassword");
  Route.get("/benefactor-authorization/get-by-token/:token", "AuthBeneficiariosController.getAuthorizationByToken");
}).prefix("/api/v1/auth");
