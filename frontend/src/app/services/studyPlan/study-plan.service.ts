import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';
import { StudyPlanRequest } from 'src/app/models/request/StudyPlanRequest';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanService {

  constructor(private httpClient: HttpClient) { }

  get tokenSession() {
    return sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
  }

  getStudyPlanById(idStudyPlan: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/plan_estudios/' + idStudyPlan, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getStudyPlanList(enabled: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/plan_estudios?habilitado=' + enabled, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getStudyPlanListByFaculty(idFaculty: number, enabled: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/plan_estudios/facultad/'+ idFaculty +'?habilitado=' + enabled, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addStudyPlanList(nameList: string[], idFaculty: string): Observable<any> {
    let addStudyPlanBody = {
      id_facultad: idFaculty,
      nombres: nameList,
    };
    return this.httpClient.post(config.API_URL + '/api/plan_estudios', addStudyPlanBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateStudyPlan(idStudyPlan: string, studyPlanBody: StudyPlanRequest): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/plan_estudios/' + idStudyPlan, studyPlanBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

}
