import { IDependence } from "./DependenceInterfaces";
import { IPqrsdfStatus } from "./PqrsdfInterfaces";

export interface IWorkEntityType {
  tet_codigo?: number;
  tet_descripcion: string;
  tet_activo: boolean;
  tet_orden: number;
  associatedStatusId?: number;
  dependenceId?: number;
  status?: IPqrsdfStatus;
  dependence?: IDependence;
}
