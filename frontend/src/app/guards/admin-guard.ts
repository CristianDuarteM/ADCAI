import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { config } from '../constants/config';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private navigation: Router) { }

  canActivate() {
    let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE);
    if(activeRole !== 'ADMIN'){
      this.navigation.navigate(['/home']);
      return false;
    }
    return true;
  }

}
