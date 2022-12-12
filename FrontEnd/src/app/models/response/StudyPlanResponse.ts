import { FacultyResponse } from "./FacultyResponse";

export interface StudyPlanResponse {
  id: number;
  nombre: string;
  id_facultad: number;
  estado: boolean;
  facultad: FacultyResponse
}
