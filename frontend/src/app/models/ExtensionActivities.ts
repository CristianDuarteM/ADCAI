import { ExtensionActivitiesRequest } from "./request/ExtensionActivitiesRequest";

export class ExtensionActivities {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  listar: boolean;
  periodo_docente_actividad_extension: ExtensionActivitiesRequest;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.estado = false;
    this.listar = false;
    this.periodo_docente_actividad_extension = new ExtensionActivitiesRequest();
  }

}
