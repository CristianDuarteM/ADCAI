import { AdministrationActivities } from "./AdministrationActivities";
import { ExtensionActivities } from "./ExtensionActivities";
import { OtherActivities } from "./OtherActivities";
import { Period } from "./Period";
import { RepresentationActivities } from "./RepresentationActivities";
import { Signature } from "./Signature";
import { InvestigationActivitiesTable } from "./table/InvestigationActivitiesTable";
import { TeacherActivitiesTable } from "./table/TeacherActivitiesTable";
import { User } from "./User";

export class Cai {
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
  periodo_docente_firmas: {
    id: number,
    rol: string,
    id_firma: number,
    id_periodo_docente: number,
    firma: Signature
  }[];

  constructor() {
    this.id = '';
    this.dedicacion = '';
    this.esActivo = false;
    this.fecha_diligenciamiento = '';
    this.id_estado = 0;
    this.id_periodo = 0;
    this.id_usuario = 0;
    this.observacion = '';
    this.asignaturas = [];
    this.actividad_investigacions = [];
    this.actividad_extensions = [];
    this.actividad_administracions = [];
    this.tipo_representacions = [];
    this.actividad_otras = [];
    this.periodo = new Period();
    this.usuario = new User();
    this.periodo_docente_firmas = [];
  }

}
