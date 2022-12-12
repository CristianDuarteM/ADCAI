import { SubjectResponse } from "../response/subjectResponse";

export interface TeacherActivitiesTable {
  subject: string;
  studyPlan: string;
  credits: number;
  theoreticalHours: number;
  practicalHours: number;
  nameFormStudyPlan: string,
  nameFormSubject: string,
  subjectList: SubjectResponse[]
}
