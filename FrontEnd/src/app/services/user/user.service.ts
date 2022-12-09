import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;

  constructor(private httpClient: HttpClient) {
    this.token = sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
  }

  getUserFilter(idDepartment: string, typeFilter: string, filter: string): Observable<any> {
    let from = 0;
    let limit = 10000;

    let route = config.API_URL + '/api/usuarios/buscar?desde=' + from + '&limite=' + limit;
    if(typeFilter !== ''){
      route += '&' + typeFilter + '=' + filter;
    }
    route += '&departamento=' + idDepartment;

    return this.httpClient.get(route, {
      headers: {
        'x-token': this.token
      }
    });
  }

  disableUser(idUser: number): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/usuarios/' + idUser, {
      headers: {
        'x-token': this.token
      }
    });
  }

  enableUser(idUser: number): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/usuarios/' + idUser, {
      estaActivo: true
    }, {
      headers: {
        'x-token': this.token
      }
    });
  }

  addTeacherList(emailList: string[], idDepartment: string): Observable<any> {
    let addTeacherBody = {
      rol: "DOCENTE",
      id_departamento: parseInt(idDepartment),
      correos: emailList
    };
    return this.httpClient.post(config.API_URL + '/api/usuarios', addTeacherBody, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getUserById(idUser: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/usuarios/' + idUser, {
      headers: {
        'x-token': this.token
      }
    });
  }

}
