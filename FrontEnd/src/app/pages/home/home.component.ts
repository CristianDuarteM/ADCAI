import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { config } from 'src/app/constants/config';
import { Auth } from 'src/app/models/Auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CaiService } from 'src/app/services/cai/cai.service';
import { UserService } from 'src/app/services/user/user.service';
import { CaiResponse } from 'src/app/models/response/CaiResponse';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tokenGoogle: string;
  token: string;
  roleList: { [key: string]: string };
  activeRole: string;
  isLoaded: boolean;
  isCaiActive: boolean;
  caiDataBasic: CaiResponse;

  constructor(private navigation: Router, private ngxPermissonsService: NgxPermissionsService,
    private authService: AuthService, public dialog: MatDialog, private caiService: CaiService,
    private userService: UserService) {
    this.tokenGoogle = '';
    this.token = '';
    this.roleList = {
      "ADMIN": "súper administrador",
      "DECANO": "decano",
      "DIRECTOR": "director",
      "DOCENTE": "docente"
    };
    this.activeRole = '';
    this.isLoaded = false;
    this.isCaiActive = false;
    this.caiDataBasic = {} as CaiResponse;
  }

  ngOnInit(): void {
    this.tokenGoogle = sessionStorage.getItem(config.SESSION_STORAGE.TOKEN_GOOGLE) || '';
    this.token = sessionStorage.getItem(config.SESSION_STORAGE.TOKEN) || '';

    if(this.tokenGoogle !== '') {
      this.logIn();
    } else if(this.token !== '') {
      this.activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE) || '';
      if(this.activeRole === '') {
        sessionStorage.clear();
        this.navigation.navigate(['/login']);
      }

      let isComplete = sessionStorage.getItem(config.SESSION_STORAGE.IS_COMPLETE) || '';
      if(isComplete !== '') {
        this.logInFirstTime(parseInt(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) + ''));
      }

      if(this.activeRole === 'DOCENTE' || this.activeRole === 'DIRECTOR') {
        this.getUser();
      } else {
        this.loadRole();
      }
    } else {
      this.navigation.navigate(['/login']);
    }
  }

  async logIn() {
    this.authService.logIn(this.tokenGoogle).subscribe({
      next: async (userResponse: Auth) => {
        await this.loadDataUser(userResponse);
        if(this.activeRole === 'DOCENTE' && userResponse.usuario.realizaCai) {
          this.caiActive(userResponse.usuario.id_departamento + '');
        } else {
          this.loadRole();
        }
      },
      error: (error: HttpErrorResponse) => {
        sessionStorage.clear();
        this.openDialog(error.error.msg, '/login');
      }
    });
  }

  async loadDataUser(userResponse: Auth) {
    sessionStorage.setItem(config.SESSION_STORAGE.TOKEN, userResponse.token);
    sessionStorage.removeItem(config.SESSION_STORAGE.TOKEN_GOOGLE);
    this.activeRole = userResponse.usuario.rols[0].nombre;
    sessionStorage.setItem(config.SESSION_STORAGE.ACTIVE_ROLE, this.activeRole);
    this.validateIsCompleteUser(userResponse.esCompleto, userResponse.usuario.id);
    sessionStorage.setItem(config.SESSION_STORAGE.ID_USER, userResponse.usuario.id + '');
    sessionStorage.setItem(config.SESSION_STORAGE.UNREAD_NOTIFICATIONS, userResponse.tieneNotificaciones + '');
  }

  validateIsCompleteUser(isComplete: boolean, idUser: number) {
    if(!isComplete) {
      sessionStorage.setItem(config.SESSION_STORAGE.IS_COMPLETE, 'false');
      this.logInFirstTime(idUser);
    }
  }

  getUser() {
    this.userService.getUserById(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '').subscribe({
      next: userServiceResponse => {
        if(userServiceResponse.usuario.realizaCai){
          this.caiActive(userServiceResponse.usuario.id_departamento);
        } else {
          this.loadRole();
        }
      },
    });
  }

  caiActive(idDepartment: string) {
    this.caiService.getLastCaiByDepartment(idDepartment).subscribe({
      next: caiServiceResponse => {
        this.caiDataBasic = caiServiceResponse;
        if(caiServiceResponse.id !== undefined) {
          let dateActual = new Date();
          let dateLimit = new Date(caiServiceResponse.fecha_limite);
          dateActual.setHours(0,0,0,0);
          dateLimit.setHours(0,0,0,0);
          if(dateActual <= dateLimit) {
            this.isCaiActive = true;
          } else {
            this.isCaiActive = false;
          }
        }
        this.loadRole();
      }
    });
    return false;
  }

  loadRole() {
    this.ngxPermissonsService.loadPermissions([this.activeRole]);
    this.isLoaded = true;
  }

  logInFirstTime(idUser: number) {
    if(this.activeRole !== 'ADMIN'){
      this.navigation.navigate(['/perfil/editar/' + idUser]);
    }
  }

  openDialog(description: string, routeRedirect: string) {
    this.dialog.open(InformativeDialogComponent, {
      data: {
        description,
        routeRedirect
      },
      disableClose: true
    });
  }

  redirectButton(route: string, idUserRequired: boolean) {
    if(idUserRequired) {
      route += sessionStorage.getItem(config.SESSION_STORAGE.ID_USER);
    }
    this.navigation.navigate([route]);
  }

}
