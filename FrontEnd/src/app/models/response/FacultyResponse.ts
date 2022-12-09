import { Dean } from "../Dean";

export interface FacultyResponse {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  decano: Dean;
}
