import { InvestigationActivities } from "../InvestigationActivities";

export interface InvestigationActivitiesTable {
  id: number;
  nombre: string;
  descripcion: string;
  horas_minimas: number;
  horas_maximas: number;
  descripcion_horas: string,
  estado: boolean,
  nombreFormInput: string;
  periodo_docente_actividad_investigacion: InvestigationActivities;
}
