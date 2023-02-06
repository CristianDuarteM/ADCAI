import { FacultyResponse } from "./FacultyResponse";

export class StudyPlanResponse {
  id: string;
  nombre: string;
  id_facultad: number;
  estado: boolean;
  facultad: FacultyResponse;

  constructor() {
    this.id = '';
    this.nombre = '';
    this.id_facultad = 0;
    this.estado = true;
    this.facultad = new FacultyResponse();
  }

}
