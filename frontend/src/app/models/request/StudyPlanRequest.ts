import { FacultyResponse } from "../response/FacultyResponse";

export class StudyPlanRequest {
  id_facultad: number;
  nombre?: string;
  estado: boolean;

  constructor() {
    this.id_facultad = 0;
    this.nombre = '';
    this.estado = false;
  }

}
