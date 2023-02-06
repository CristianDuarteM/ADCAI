import { OtherActivitiesRequest } from "./request/OtherActivitiesRequest";

export class OtherActivities {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  listar: boolean;
  periodo_docente_otra: OtherActivitiesRequest;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.estado = false;
    this.listar = false;
    this.periodo_docente_otra = new OtherActivitiesRequest();
  }

}
