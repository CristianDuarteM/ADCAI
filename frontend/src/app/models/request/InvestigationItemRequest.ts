export class InvestigationActivitiesRequest {
  id: number;
  nombre: string;
  descripcion: string;
  horas_minimas: number;
  horas_maximas: number;
  descripcion_horas: string;
  estado: boolean;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.horas_minimas = 0;
    this.horas_maximas = 0;
    this.descripcion_horas = '';
    this.estado = true;
  }

}
