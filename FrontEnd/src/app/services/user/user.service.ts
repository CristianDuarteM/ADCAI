import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';
import { UserRequest } from 'src/app/models/request/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  get tokenSession() {
    return sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';
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
        'x-token': this.tokenSession
      }
    });
  }

  disableUser(idUser: number): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/usuarios/' + idUser, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  enableUser(idUser: number): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/usuarios/' + idUser, {
      estaActivo: true
    }, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addTeacherList(emailList: string[], idDepartment: string): Observable<any> {
    let addTeacherBody = {
      id_departamento: idDepartment,
      correos: emailList
    };
    return this.httpClient.post(config.API_URL + '/api/usuarios', addTeacherBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getUserById(idUser: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/usuarios/' + idUser, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  updateUser(idUser: string, userBody: UserRequest): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/usuarios/' + idUser, userBody, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  addSignature(fileSignature: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', fileSignature);
    return this.httpClient.post(config.API_URL + '/api/firmas' , formData, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

  getNotificationsByIdUser(idUser: string, activeRole: string): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/notificaciones/' + idUser + '?rol=' + activeRole, {
      headers: {
        'x-token': this.tokenSession
      }
    });
  }

}
