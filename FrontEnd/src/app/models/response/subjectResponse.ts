import { StudyPlanResponse } from "./StudyPlanResponse";

export interface SubjectResponse {
  id: number;
  id_programa: string;
  nombre: number;
  estado: boolean;
  descripcion: string;
  creditos: string;
  horas_practicas: string;
  horas_teoricas: string;
  plan_estudio: StudyPlanResponse;
}
