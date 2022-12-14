import { OtherActivitiesRequest } from "./request/OtherActivitiesRequest";

export interface OtherActivities {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean,
  listar: boolean;
  periodo_docente_otra: OtherActivitiesRequest;
}
