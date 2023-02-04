import { Period } from "../Period";
import { User } from "../User";

export interface CaiHistoricalResponse {
  id: string;
  dedicacion: string;
  fecha_diligenciamiento: string;
  id_estado: number;
  id_periodo: number;
  id_usuario: number;
  observacion: string;
  esActivo: boolean;
  horas_administracion: number;
  horas_extension: number;
  horas_investigacion: number;
  horas_lectivas_semanales: number;
  horas_otras: number;
  horas_representacion: number;
  horas_totales: number;
  periodo: Period;
  usuario: User;
}
