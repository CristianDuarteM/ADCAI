import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';
import { CaiModel } from 'src/app/models/CaiModel';

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

}
