import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanService {

  constructor(private httpClient: HttpClient) { }

  get tokenSession() {
    return sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
  }

  getStudyPlanList(enabled: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/plan_estudios?habilitado=' + enabled, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

}
