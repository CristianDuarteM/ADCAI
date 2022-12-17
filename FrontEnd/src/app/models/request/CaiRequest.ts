import { InvestigationActivities } from "../InvestigationActivities";
import { AdministrationActivitiesRequest } from "./AdministrationActivitiesRequest";
import { ExtensionActivitiesRequest } from "./ExtensionActivitiesRequest";
import { OtherActivitiesRequest } from "./OtherActivitiesRequest";
import { RepresentationActivitiesRequest } from "./RepresentationActivitiesRequest";

export class CaiRequest {
  asignaturas: number[];
  investigacion: InvestigationActivities[];
  extension: ExtensionActivitiesRequest[];
  administracion: AdministrationActivitiesRequest[];
  representaciones: RepresentationActivitiesRequest[];
  otras: OtherActivitiesRequest[];
  observaciones: string;
  dedicacion: string;
  id_firma: string;

  constructor() {
    this.asignaturas = [];
    this.investigacion = [];
    this.extension = [];
    this.administracion = [];
    this.representaciones = [];
    this.otras = [];
    this.observaciones = '';
    this.dedicacion = '';
    this.id_firma = '';
  }

}
