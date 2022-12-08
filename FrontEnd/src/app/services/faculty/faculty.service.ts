import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private httpClient: HttpClient) { }

  getFacultyList(): Observable<any> {
    let token = sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
    let from = 0;
    let limit = 1000;

    return this.httpClient.get(config.API_URL + '/api/facultades?desde=' + from + '&limite=' + limit, {
      headers: {
        'x-token': token
      }
    });
  }

  addFaculty() {

  }

  updateFaculty() {

  }

}
