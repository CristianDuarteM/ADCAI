import { StudyPlanResponse } from "./StudyPlanResponse";

export class SubjectResponse {
  id: number;
  id_programa: string;
  nombre: number;
  estado: boolean;
  descripcion: string;
  creditos: string;
  horas_practicas: string;
  horas_teoricas: string;
  plan_estudio: StudyPlanResponse;

  constructor() {
    this.id = 0;
    this.id_programa = '';
    this.nombre = 0;
    this.estado = true;
    this.descripcion = '';
    this.creditos = '';
    this.horas_practicas = '';
    this.horas_teoricas = '';
    this.plan_estudio = new StudyPlanResponse();
  }

}
