import { InvestigationActivities } from "../InvestigationActivities";
import { AdministrationActivitiesRequest } from "./AdministrationActivitiesRequest";
import { ExtensionActivitiesRequest } from "./ExtensionActivitiesRequest";
import { OtherActivitiesRequest } from "./OtherActivitiesRequest";
import { RepresentationActivitiesRequest } from "./RepresentationActivitiesRequest";

export interface CaiRequest {
  asignaturas: number[];
  investigacion: InvestigationActivities[];
  extension: ExtensionActivitiesRequest[];
  administracion: AdministrationActivitiesRequest[];
  representaciones: RepresentationActivitiesRequest[];
  otras: OtherActivitiesRequest[];
  observaciones: string;
  dedicacion: string;
  id_firma: string;
}
