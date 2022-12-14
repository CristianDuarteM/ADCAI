import { AdministrationActivities } from "./AdministrationActivities";
import { ExtensionActivities } from "./ExtensionActivities";
import { OtherActivities } from "./OtherActivities";
import { Period } from "./Period";
import { RepresentationActivities } from "./RepresentationActivities";
import { InvestigationActivitiesTable } from "./table/InvestigationActivitiesTable";
import { TeacherActivitiesTable } from "./table/TeacherActivitiesTable";
import { User } from "./User";

export interface Cai {
  id: string;
  dedicacion: string;
  esActivo: boolean;
  fecha_diligenciamiento: string;
  id_estado: number;
  id_periodo: number;
  id_usuario: number;
  observacion: string;
  asignaturas: TeacherActivitiesTable[];
  actividad_investigacions: InvestigationActivitiesTable[];
  actividad_extensions: ExtensionActivities[];
  actividad_administracions: AdministrationActivities[];
  tipo_representacions: RepresentationActivities[];
  actividad_otras: OtherActivities[];
  periodo: Period;
  usuario: User;
}
