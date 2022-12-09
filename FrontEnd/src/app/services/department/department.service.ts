import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';
import { DepartmentRequest } from 'src/app/models/request/DepartmentRequest';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  token: string;

  constructor(private httpClient: HttpClient) {
    this.token = sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
  }

  getDepartmentList(): Observable<any> {
    let from = 0;
    let limit = 1000;

    return this.httpClient.get(config.API_URL + '/api/departamentos?desde=' + from + '&limite=' + limit, {
      headers: {
        'x-token': this.token
      }
    });
  }

  addDepartment(departmentBody: DepartmentRequest): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/departamentos', departmentBody, {
      headers: {
        'x-token': this.token
      }
    });
  }

  updateDepartment(departmentBody: {}, id: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/departamentos/' + id, departmentBody, {
      headers: {
        'x-token': this.token
      }
    });
  }

  disableDepartment(idDepartment: number): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/departamentos/' + idDepartment, {
      headers: {
        'x-token': this.token
      }
    });
  }

  enableDepartment(idDepartment: number): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/departamentos/' + idDepartment, {
      estado: true
    }, {
      headers: {
        'x-token': this.token
      }
    })
  }

  getDepartmentById(id: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/departamentos/' + id , {
      headers: {
        'x-token': this.token
      }
    });
  }

}
