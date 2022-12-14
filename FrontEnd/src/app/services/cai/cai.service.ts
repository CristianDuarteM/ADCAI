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

  getCaiListByDepartmentAndEvaluate(idDepartment: string, isEvaluate: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/cai/departamento/' + idDepartment + '?paraEvaluar=' + isEvaluate, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getCaiListByFacultyAndEvaluate(idFaculty: string, isEvaluate: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/cai/facultad/' + idFaculty + '?paraEvaluar=' + isEvaluate, {
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
