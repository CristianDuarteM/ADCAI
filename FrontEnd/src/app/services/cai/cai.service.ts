import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';
import { AdministrationActivities } from 'src/app/models/AdministrationActivities';
import { CaiModel } from 'src/app/models/CaiModel';
import { EvaluateCai } from 'src/app/models/EvaluateCai';
import { ExtensionActivities } from 'src/app/models/ExtensionActivities';
import { Note } from 'src/app/models/Note';
import { OtherActivities } from 'src/app/models/OtherActivities';
import { RepresentationActivities } from 'src/app/models/RepresentationActivities';
import { CaiRequest } from 'src/app/models/request/CaiRequest';
import { InvestigationActivitiesRequest } from 'src/app/models/request/InvestigationItemRequest';

@Injectable({
  providedIn: 'root'
})
export class CaiService {

  constructor(private httpClient: HttpClient) {
  }

  get tokenSession() {
    return sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
  }

  requestCai(requestCai: CaiModel): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/periodos', requestCai, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateDateCai(idPeriod: string, date: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/periodos/' + idPeriod, {
      limite: date
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getCaiByDepartment(idDepartment: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/periodos/departamento/' + idDepartment, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getSubjectListByStudyPlan(idProgram: string, isEnable: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/asignaturas/programa/' + idProgram + '?habilitada=' + isEnable, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getSubjectListById(idSubject: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/asignaturas/' + idSubject, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getStudyPlanListWithFilter(isEnable: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/plan_estudios?habilitado=' + isEnable, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getInvestigationActivityListWithFilter(isEnable: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesInvestigacion?habilitada=' + isEnable, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getExtensionActivityListWithFilter(isEnable: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesExtension?habilitada=' + isEnable, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getAdministrationActivityListWithFilter(isEnable: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesAdministracion?habilitada=' + isEnable, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getRepresentationActivityListWithFilter(isEnable: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/representaciones?habilitada=' + isEnable, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getOtherActivityListWithFilter(isEnable: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/otrasActividades?habilitada=' + isEnable, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getNoteListWithFilter(isEnable: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/notas?habilitada=' + isEnable, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getLastCaiByDepartment(idDepartment: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/periodos/departamento/' + idDepartment, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getCaiListByUser(idUser: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/cai/usuario/' + idUser, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  fillCai(caiBody: CaiRequest): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/cai', caiBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateCai(idCai: string, caiBody: CaiRequest): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/cai/' + idCai, caiBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getCaiList(idUser: string, role: string, evaluate: string): Observable<any> {
    let from = 0;
    let limit = 100000;
    return this.httpClient.get(config.API_URL + '/api/cai/listar?usuario=' + idUser + '&rol=' + role +
    '&evaluar=' + evaluate + '&desde=' + from + '&limit=' + limit, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getCaiById(idCai: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/cai/' + idCai, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  evaluateCaiDirector(idCai: string, evaluateCaiModel: EvaluateCai): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/cai/evaluarDirector/' + idCai, evaluateCaiModel, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  evaluateCaiDean(idCai: string, evaluateCaiModel: EvaluateCai): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/cai/evaluarDecano/' + idCai, evaluateCaiModel, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addInvestigationItem(investigationItemBody: InvestigationActivitiesRequest): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/actividadesInvestigacion', investigationItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateInvestigationItem(idInvestigationItem: string, investigationItemBody: InvestigationActivitiesRequest): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/actividadesInvestigacion/' + idInvestigationItem, investigationItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  disableInvestigationItem(idInvestigationItem: string): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/actividadesInvestigacion/' + idInvestigationItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  enableInvestigationItem(idInvestigationItem: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/actividadesInvestigacion/' + idInvestigationItem, {
      estado: true
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getInvestigationItemById(idInvestigationItem: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesInvestigacion/' + idInvestigationItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addExtensionItem(extensionItemBody: ExtensionActivities): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/actividadesExtension', extensionItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateExtensionItem(idExtensionItem: string, extensionItemBody: ExtensionActivities): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/actividadesExtension/' + idExtensionItem, extensionItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  disableExtensionItem(idExtensionItem: string): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/actividadesExtension/' + idExtensionItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  enableExtensionItem(idExtensionItem: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/actividadesExtension/' + idExtensionItem, {
      estado: true
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getExtensionItemById(idExtensionItem: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesExtension/' + idExtensionItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addAdministrationItem(administrationItemBody: AdministrationActivities): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/actividadesAdministracion', administrationItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateAdministrationItem(idAdministrationItem: string, administrationItemBody: AdministrationActivities): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/actividadesAdministracion/' + idAdministrationItem, administrationItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  disableAdministrationItem(idAdministrationItem: string): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/actividadesAdministracion/' + idAdministrationItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  enableAdministrationItem(idAdministrationItem: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/actividadesAdministracion/' + idAdministrationItem, {
      estado: true
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getAdministrationItemById(idAdministrationItem: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesAdministracion/' + idAdministrationItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addRepresentationItem(representationItemBody: RepresentationActivities): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/representaciones', representationItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateRepresentationItem(idRepresentationItem: string, representationItemBody: RepresentationActivities): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/representaciones/' + idRepresentationItem, representationItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  disableRepresentationItem(idRepresentationItem: string): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/representaciones/' + idRepresentationItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  enableRepresentationItem(idRepresentationItem: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/representaciones/' + idRepresentationItem, {
      estado: true
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getRepresentationItemById(idRepresentationItem: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/representaciones/' + idRepresentationItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addOtherItem(otherItemBody: OtherActivities): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/otrasActividades', otherItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateOtherItem(idOtherItem: string, otherItemBody: OtherActivities): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/otrasActividades/' + idOtherItem, otherItemBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  disableOtherItem(idOtherItem: string): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/otrasActividades/' + idOtherItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  enableOtherItem(idOtherItem: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/otrasActividades/' + idOtherItem, {
      estado: true
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getOtherItemById(idOtherItem: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/otrasActividades/' + idOtherItem, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addNote(noteBody: Note): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/notas', noteBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateNote(idNote: string, noteBody: Note): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/notas/' + idNote, noteBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  disableNote(idNote: string): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/notas/' + idNote, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  enableNote(idNote: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/notas/' + idNote, {
      estado: true
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getNoteItemById(idNote: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/notas/' + idNote, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getCaiFile(idCai: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/cai/pdf/' + idCai, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getCaiFileSigned(idCai: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/evidencias/' + idCai, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addSignedFile(role: string, idCai: string, signedFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', signedFile);
    return this.httpClient.post(config.API_URL + '/api/evidencias/sinFirma/' + idCai + '?rol=' + role, formData, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  downloadCaiListByDepartment(idDepartment: string): Observable<Blob> {
    return this.httpClient.get(config.API_URL + '/api/cai/pdf/departamento/' + idDepartment, {
      headers: {
        'x-token': this.tokenSession
      },
      responseType: 'blob'
    });
  }

}
