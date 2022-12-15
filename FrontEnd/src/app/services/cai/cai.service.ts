import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';
import { CaiModel } from 'src/app/models/CaiModel';
import { CaiRequest } from 'src/app/models/request/CaiRequest';

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

  getSubjectListByStudyPlan(idProgram: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/asignaturas/programa/' + idProgram, {
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

  getStudyPlanList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/plan_estudios', {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  fillSubjects(subjectList: []): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/cai', {
      asignaturas: subjectList
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getInvestigationActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesInvestigacion', {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getExtensionActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesExtension', {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getAdministrationActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesAdministracion', {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getRepresentationActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/representaciones', {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getOtherActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/otrasActividades', {
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

}
