import { ExtensionActivitiesRequest } from "./request/ExtensionActivitiesRequest";

export interface ExtensionActivities {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean,
  listar: boolean;
  periodo_docente_actividad_extension: ExtensionActivitiesRequest;
}
