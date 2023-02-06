import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { config } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  logIn(tokenGoogle: string): Observable<any> {
    let body = {
      id_token: tokenGoogle
    };

    return this.httpClient.post(config.API_URL + '/api/auth/login', body);
  }

}
