import { IProgram } from "./ProgramInterfaces";

export interface IDependence {
  dep_codigo?: number;
  dep_descripcion?: string;
  dep_activo?: boolean;
  dep_orden?: number;
  programs: IProgram[];
}
