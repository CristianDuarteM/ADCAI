import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';
import { DepartmentRequest } from 'src/app/models/request/DepartmentRequest';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  get tokenSession() {
    return this.authService.idToken;
  }

  getDepartmentList(): Observable<any> {
    let from = 0;
    let limit = 10000;

    return this.httpClient.get(config.API_URL + '/api/departamentos?desde=' + from + '&limite=' + limit, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addDepartment(departmentBody: DepartmentRequest): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/departamentos', departmentBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateDepartment(departmentBody: {}, id: string): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/departamentos/' + id, departmentBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  disableDepartment(idDepartment: number): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/departamentos/' + idDepartment, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  enableDepartment(idDepartment: number): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/departamentos/' + idDepartment, {
      estado: true
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    })
  }

  getDepartmentById(id: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/departamentos/' + id , {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getDepartmentListByFaculty(idFaculty: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/departamentos/facultad/' + idFaculty, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

}
