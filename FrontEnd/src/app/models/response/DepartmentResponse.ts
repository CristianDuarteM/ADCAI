import { Director } from "../Director";
import { FacultyResponse } from "./FacultyResponse";

export interface DepartmentResponse {
  id: string;
  nombre: string;
  descripcion: string;
  director: Director;
  id_facultad: number;
  estado: boolean;
  facultad: FacultyResponse;
}
