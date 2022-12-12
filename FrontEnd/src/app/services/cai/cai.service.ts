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

  token: string;

  constructor(private httpClient: HttpClient) {
    this.token = sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
  }

  requestCai(requestCai: CaiModel): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/periodos', requestCai, {
      headers: {
        'x-token': this.token
      }
    });
  }

  updateDateCai(idPeriod: string, date: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/periodos/' + idPeriod, {
      limite: date
    }, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getCaiByDepartment(idDepartment: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/periodos/departamento/' + idDepartment, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getSubjectListByStudyPlan(idProgram: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/asignaturas/programa/' + idProgram, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getSubjectListById(idSubject: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/asignaturas/' + idSubject, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getStudyPlanList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/plan_estudios', {
      headers: {
        'x-token': this.token
      }
    });
  }

  fillSubjects(subjectList: []): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/cai', {
      asignaturas: subjectList
    }, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getInvestigationActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesInvestigacion', {
      headers: {
        'x-token': this.token
      }
    });
  }

  getExtensionActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesExtension', {
      headers: {
        'x-token': this.token
      }
    });
  }

  getAdministrationActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/actividadesAdministracion', {
      headers: {
        'x-token': this.token
      }
    });
  }

  getRepresentationActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/representaciones', {
      headers: {
        'x-token': this.token
      }
    });
  }

  getOtherActivityList(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/otrasActividades', {
      headers: {
        'x-token': this.token
      }
    });
  }

  getLastCaiByDepartment(idDepartment: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/periodos/departamento/' + idDepartment, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getCaiListByUser(idUser: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/cai/usuario/' + idUser, {
      headers: {
        'x-token': this.token
      }
    });
  }

  fillCai(caiBody: CaiRequest): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/cai', caiBody, {
      headers: {
        'x-token': this.token
      }
    });
  }

}
