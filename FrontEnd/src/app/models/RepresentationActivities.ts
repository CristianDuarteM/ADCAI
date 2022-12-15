import { RepresentationActivitiesRequest } from "./request/RepresentationActivitiesRequest";

export interface RepresentationActivities {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean,
  listar: boolean;
  periodo_docente_representacion: RepresentationActivitiesRequest;
}
