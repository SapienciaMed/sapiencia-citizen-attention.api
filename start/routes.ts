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
    Route.post('/get-paginated', 'PqrsdfsController.getPqrsdfPaginated')
    Route.post("/create", "PqrsdfsController.createPqrsdf");
    Route.post("/create-request-reopen", "PqrsdfsController.createRequestReopen");
    Route.get("/get-by-id/:id", "PqrsdfsController.getPrsdfById");
    Route.post("/get-people-by-filters", "PqrsdfsController.getPeopleByFilters");
    Route.get("/get-by-filters", "PqrsdfsController.getPqrsdfByIdentificationAndFilingNumber");
    Route.get("/get-person-by-document/:identification", "PqrsdfsController.getPersonByDocument");
    Route.post("/update-person", "PqrsdfsController.updatePerson");
    Route.post("/upload", "PqrsdfsController.uploadFile");
    Route.post("/get-request-by-filters", "PqrsdfsController.getPqrsdfByRequest");
  }).prefix("/pqrsdf");

  /* Work entities */
  Route.group(() => {
    Route.post("/create", "WorkEntityController.createWorkEntity").middleware("auth:ENTIDADES_TRABAJO_CREAR");
    Route.post("/update", "WorkEntityController.updateWorkEntity").middleware("auth:ENTIDADES_TRABAJO_EDITAR");
    Route.get("/get-types", "WorkEntityController.getWorkEntityTypes");
    Route.get("/get-programs", "WorkEntityController.getProgramsAffairs");
    Route.get("/get-by-id/:id", "WorkEntityController.getWorkEntityById").middleware("auth:ENTIDADES_TRABAJO_EDITAR");
    Route.post("/get-by-filters", "WorkEntityController.getWorkEntityByFilters").middleware(
      "auth:ENTIDADES_TRABAJO_CONSULTAR"
    );
    Route.post("/get-user-by-filters", "WorkEntityController.getUserByFilters").middleware(
      "auth:ENTIDADES_TRABAJO_CONSULTAR"
    );
    Route.get("/get-user-by-document/:identification", "WorkEntityController.getUserByDocument").middleware(
      "auth:ENTIDADES_TRABAJO_CONSULTAR"
    );
    Route.get("/get-Entitymanagers-by-entityType-id/:id", "WorkEntityController.getEntityManagersByEntityTypeId");
  }).prefix("/work-entity");

  /*ARCHIVOS*/
  Route.group(()=>{
    Route.get("get-file","StorageController.getFile")
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
}).prefix("/api/v1/utility");

Route.group(() => {
  Route.get("/get-type-solicituds", "TsoTipoSolicitudsController.getTipoSolicitudes");
  Route.get("/get-type-docuement", "ListadoGenericosController.getTypeDocuement");
  Route.get("/get-legal-entity", "TipoEntidadJuridicasController.getTypeEntidadJuridica");
  Route.get("/get-response-medium", "MedioDeRespuestasController.getMedioDeRespuesta");
  Route.get("/get-Programs", "ProgramasController.getPrograms");
  Route.get("/get-solicitudes", "AsuntoSolicitudsController.asuntoSolicitud");
  Route.get("/get-paises", "ListadoGenericosController.getPaises");
  Route.get("/get-departamentos", "ListadoGenericosController.getDepartamentos");
  Route.get("/get-municipios/:id", "ListadoGenericosController.getMunicipios");
  Route.get("/get-objecto-solicitud", "ObjectoSolicitudsController.getObjectoSolicitud");
  Route.get("/get-listaParametros", "ListaParametrosController.getListaParametros");
});

// *************************************************************************
// ************************* ROUTES Auth ***********************************
// *************************************************************************

Route.group(() => {
    Route.post("/signin", "AuthBeneficiariosController.signIn");
}).prefix("/api/v1/auth");
