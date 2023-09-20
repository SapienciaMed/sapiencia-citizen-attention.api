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
    Route.get("/get-by-id/:id", "DaysParametrizationController.getDaysParametrizationById");
    Route.get("/get-all", "DaysParametrizationController.getDaysParametrizations");
    Route.get("/get-day-types", "DaysParametrizationController.getDayTypes");
    Route.post("/create", "DaysParametrizationController.createDaysParametrization");
    Route.post("/update", "DaysParametrizationController.updateDaysParametrization");
  }).prefix("/day-parametrization");
  /* PQRSDF */
  Route.group(() => {
    Route.get("/get-by-id/:id", "PqrsdfsController.getPrsdfById");
  }).prefix("/pqrsdf");
}).prefix("/api/v1/");
// .middleware("auth");

/**************************
 ******TABLAS MAESTRAS******
 **************************/
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
