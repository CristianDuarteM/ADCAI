import { DepartmentResponse } from "./response/DepartmentResponse";
import { Role } from "./Role";

export interface User {
  id: number;
  correo: string;
  nombre: string;
  apellido: string;
  codigo: string;
  telefono: string;
  esTiempoCompleto: boolean;
  id_departamento: number;
  id_firma: number;
  estaActivo: boolean;
  rols: Role[];
  realizaCai: boolean;
  departamento: DepartmentResponse;
}
