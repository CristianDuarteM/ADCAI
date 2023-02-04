import { InvestigationActivities } from "../InvestigationActivities";

export class InvestigationActivitiesTable {
  id: number;
  nombre: string;
  descripcion: string;
  horas_minimas: number;
  horas_maximas: number;
  descripcion_horas: string;
  estado: boolean;
  nombreFormInput: string;
  periodo_docente_actividad_investigacion: InvestigationActivities;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.horas_minimas = 0;
    this.horas_maximas = 0;
    this.descripcion_horas = '';
    this.estado = true;
    this.nombreFormInput = '';
    this.periodo_docente_actividad_investigacion = new InvestigationActivities();
  }

}
