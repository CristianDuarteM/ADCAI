import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';
import { FacultyRequest } from 'src/app/models/request/FacultyRequest';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private httpClient: HttpClient) {
  }

  get tokenSession() {
    return sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
  }

  getFacultyList(): Observable<any> {
    let from = 0;
    let limit = 10000;

    return this.httpClient.get(config.API_URL + '/api/facultades?desde=' + from + '&limite=' + limit, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addFaculty(facultyBody: FacultyRequest): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/facultades', facultyBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateFaculty(facultyBody: {}, id: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/facultades/' + id, facultyBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  disableFaculty(idFaculty: number): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/facultades/' + idFaculty, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  enableFaculty(idFaculty: number): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/facultades/' + idFaculty, {
      estado: true
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    })
  }

  getFacultyById(id: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/facultades/' + id , {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getFacultyByDean(idDean: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/facultades/buscarFacultad/' + idDean , {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

}
