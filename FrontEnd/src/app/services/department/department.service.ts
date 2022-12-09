import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';

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

  addDepartment(): Observable<any> {
    return this.httpClient.post(config.API_URL + '/api/departamentos', {}, {
      headers: {
        'x-token': this.token
      }
    });
  }

  updateDepartment(): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/departamentos/' + 'id', {}, {
      headers: {
        'x-token': this.token
      }
    });
  }

  disableDepartment(): Observable<any> {
    return this.httpClient.delete(config.API_URL + '/api/departamentos/' + 'id', {
      headers: {
        'x-token': this.token
      }
    });
  }

  enableDepartment(): Observable<any> {
    return this.httpClient.put(config.API_URL + '/api/departamentos/' + 'id', {
      estado: true
    }, {
      headers: {
        'x-token': this.token
      }
    })
  }

  getDepartmentById(): Observable<any> {
    return this.httpClient.get(config.API_URL + '/api/departamentos/' + 'id' , {
      headers: {
        'x-token': this.token
      }
    });
  }

}
