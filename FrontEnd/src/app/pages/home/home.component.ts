import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { config } from 'src/app/constants/config';
import { Auth } from 'src/app/models/Auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CaiService } from 'src/app/services/cai/cai.service';
import { UserService } from 'src/app/services/user/user.service';
import { CaiResponse } from 'src/app/models/response/CaiResponse';
import { Dialog } from 'src/app/models/Dialog';
import { Cai } from 'src/app/models/Cai';

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
  isCaiCompleted: boolean;
  isRejectCai: boolean;
  caiDataBasic: CaiResponse;

  constructor(private navigation: Router, private ngxPermissonsService: NgxPermissionsService,
    private authService: AuthService, private dialog: Dialog, private caiService: CaiService,
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
    this.isCaiCompleted = false;
    this.isRejectCai = false;
    this.caiDataBasic = new CaiResponse();
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
          this.caiCompleted();
        } else {
          this.loadRole();
        }
      },
      error: (error: HttpErrorResponse) => {
        sessionStorage.clear();
        this.dialog.openDialog(error.error.msg, '/login');
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
          this.caiCompleted();
        } else {
          this.loadRole();
        }
      },
      error: (error: HttpErrorResponse) => {
        sessionStorage.clear();
        this.dialog.openDialog(error.error.msg, '/login');
      }
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
        this.caiCompleted();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
    return false;
  }

  caiCompleted() {
    this.caiService.getCaiList(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '', 'docente', 'no').subscribe({
      next: caiServiceResponse => {
        if(caiServiceResponse.rows.length > 0) {
          let cai: Cai = caiServiceResponse.rows[caiServiceResponse.rows.length - 1];
          let actualDate = new Date();
          if(cai.periodo !== null && cai.periodo.anno === actualDate.getFullYear()) {
            if(((cai.periodo.semestre === 1 && actualDate.getMonth() < 6) || (cai.periodo.semestre === 2 && actualDate.getMonth() >= 6))) {
              this.isCaiCompleted = true;
              if(cai.id_estado === 4 || cai.id_estado === 5) {
                this.isRejectCai = true;
              }
            }
          }
        }
        this.loadRole();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
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

  redirectButton(route: string, idUserRequired: boolean) {
    if(idUserRequired) {
      route += sessionStorage.getItem(config.SESSION_STORAGE.ID_USER);
    }
    this.navigation.navigate([route]);
  }

}
