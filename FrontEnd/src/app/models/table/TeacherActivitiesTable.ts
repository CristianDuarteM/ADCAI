import { StudyPlanResponse } from "../response/StudyPlanResponse";
import { SubjectResponse } from "../response/subjectResponse";

export interface TeacherActivitiesTable {
  creditos: number;
  horas_teoricas: number;
  horas_practicas: number;
  nameFormStudyPlan: string,
  nameFormSubject: string,
  subjectList: SubjectResponse[];
  nombre: string;
  id: string;
  plan_estudio: StudyPlanResponse;
}
