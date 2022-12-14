import { AdministrationActivitiesRequest } from "./request/AdministrationActivitiesRequest";

export interface AdministrationActivities {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean,
  listar: boolean;
  periodo_docente_actividad_administracion: AdministrationActivitiesRequest;
}
