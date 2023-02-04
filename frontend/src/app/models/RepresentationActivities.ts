import { RepresentationActivitiesRequest } from "./request/RepresentationActivitiesRequest";

export class RepresentationActivities {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  listar: boolean;
  periodo_docente_representacion: RepresentationActivitiesRequest;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.estado = false;
    this.listar = false;
    this.periodo_docente_representacion = new RepresentationActivitiesRequest();
  }

}
