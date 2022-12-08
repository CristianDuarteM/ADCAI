import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  token: string;

  constructor(private httpClient: HttpClient) {
    this.token = sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
  }

  getFacultyList(): Observable<any> {
    let from = 0;
    let limit = 1000;

    return this.httpClient.get(config.API_URL + '/api/facultades?desde=' + from + '&limite=' + limit, {
      headers: {
        'x-token': this.token
      }
    });
  }

  addFaculty(faculty: FacultyResponse): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/facultades', {
      nombre: faculty.nombre,
      descripcion: faculty.descripcion
    }, {
      headers: {
        'x-token': this.token
      }
    });
  }

  updateFaculty() {

  }

  disableFaculty(idFaculty: number): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/facultades/' + idFaculty, {
      headers: {
        'x-token': this.token
      }
    });
  }

  enableFaculty(idFaculty: number): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/facultades/' + idFaculty, {
      estado: true
    }, {
      headers: {
        'x-token': this.token
      }
    })
  }

}
