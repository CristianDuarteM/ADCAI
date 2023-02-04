import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { config } from '../constants/config';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

  constructor(private navigation: Router) { }

  canActivate() {
    let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE);
    if(activeRole !== 'DOCENTE'){
      this.navigation.navigate(['/home']);
      return false;
    }
    return true;
  }

}
