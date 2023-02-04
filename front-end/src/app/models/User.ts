import { DepartmentResponse } from "./response/DepartmentResponse";
import { Role } from "./Role";

export class User {
  id: number;
  correo: string;
  nombre: string;
  apellido: string;
  codigo: string;
  id_departamento: number;
  id_firma: number;
  estaActivo: boolean;
  rols: Role[];
  realizaCai: boolean;
  departamento: DepartmentResponse;

  constructor() {
    this.id = 0;
    this.correo = '';
    this.nombre = '';
    this.apellido = '';
    this.codigo = '';
    this.id_departamento = 0;
    this.id_firma = 0;
    this.estaActivo = false;
    this.rols = [];
    this.realizaCai = true;
    this.departamento = new DepartmentResponse();
  }

}
