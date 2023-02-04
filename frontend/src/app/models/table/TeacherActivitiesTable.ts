import { StudyPlanResponse } from "../response/StudyPlanResponse";
import { SubjectResponse } from "../response/subjectResponse";

export class TeacherActivitiesTable {
  creditos: number;
  horas_teoricas: number;
  horas_practicas: number;
  nameFormStudyPlan: string;
  nameFormSubject: string;
  subjectList: SubjectResponse[];
  nombre: string;
  id: string;
  plan_estudio: StudyPlanResponse;

  constructor() {
    this.creditos = 0;
    this.horas_teoricas = 0;
    this.horas_practicas = 0;
    this.nameFormStudyPlan = '';
    this.nameFormSubject = '';
    this.subjectList = [];
    this.nombre = '';
    this.id = '';
    this.plan_estudio = new StudyPlanResponse();
  }

}
