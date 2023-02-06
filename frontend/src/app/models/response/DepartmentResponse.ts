import { Director } from "../Director";
import { FacultyResponse } from "./FacultyResponse";

export class DepartmentResponse {
  id: string;
  nombre: string;
  descripcion: string;
  director: Director;
  estado: boolean;
  id_facultad: number;
  facultad: FacultyResponse;

  constructor() {
    this.id = '';
    this.nombre = '';
    this.descripcion = '';
    this.director = new Director();
    this.estado = false;
    this.id_facultad = 0;
    this.facultad = new FacultyResponse();
  }

}
