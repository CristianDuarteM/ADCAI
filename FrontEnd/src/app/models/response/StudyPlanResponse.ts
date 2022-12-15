import { FacultyResponse } from "./FacultyResponse";

export interface StudyPlanResponse {
  id: string;
  nombre: string;
  id_facultad: number;
  estado: boolean;
  facultad: FacultyResponse
}
