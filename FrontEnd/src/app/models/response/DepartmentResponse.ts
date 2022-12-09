import { Director } from "../Director";
import { FacultyResponse } from "./FacultyResponse";

export interface DepartmentResponse {
  id: string;
  nombre: string;
  descripcion: string;
  director: Director;
  estado: boolean;
  facultad: FacultyResponse;
}
