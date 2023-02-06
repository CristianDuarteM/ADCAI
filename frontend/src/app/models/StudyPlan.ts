import { FacultyResponse } from "./response/FacultyResponse";

export class StudyPlan {
  id: number;
  id_facultad: number;
  nombre: string;
  estado: boolean;
  facultad: FacultyResponse;

  constructor() {
    this.id = 0;
    this.id_facultad = 0;
    this.nombre = '';
    this.estado = false;
    this.facultad = new FacultyResponse();
  }

}
