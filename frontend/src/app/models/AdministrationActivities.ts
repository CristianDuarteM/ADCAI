import { AdministrationActivitiesRequest } from "./request/AdministrationActivitiesRequest";

export class AdministrationActivities {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  listar: boolean;
  periodo_docente_actividad_administracion: AdministrationActivitiesRequest;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.estado = false;
    this.listar = false;
    this.periodo_docente_actividad_administracion = new AdministrationActivitiesRequest();
  }

}
