import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { config } from 'src/app/constants/config';
import { Auth } from 'src/app/models/Auth';
import { AuthService } from 'src/app/services/auth/auth.service';
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

  constructor(private navigation: Router, private ngxPermissonsService: NgxPermissionsService,
    private authService: AuthService, public dialog: MatDialog) {
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
        this.logInFirstTime();
      }
      this.loadRole();
    } else {
      this.navigation.navigate(['/login']);
    }
  }

  logIn() {
    this.authService.logIn(this.tokenGoogle).subscribe({
      next: (userResponse: Auth) => {
        sessionStorage.setItem(config.SESSION_STORAGE.TOKEN, userResponse.token);
        sessionStorage.removeItem(config.SESSION_STORAGE.TOKEN_GOOGLE);
        this.activeRole = userResponse.usuario.rols[0].nombre;
        sessionStorage.setItem(config.SESSION_STORAGE.ACTIVE_ROLE, this.activeRole);
        this.validateIsCompleteUser(userResponse.esCompleto);
        sessionStorage.setItem(config.SESSION_STORAGE.ID_USER, userResponse.usuario.id + '');
        this.loadRole();
      },
      error: (error: HttpErrorResponse) => {
        sessionStorage.clear();
        this.openDialog(error.error.msg, '/login');
      }
    });
  }

  validateIsCompleteUser(isComplete: boolean) {
    if(!isComplete) {
      sessionStorage.setItem(config.SESSION_STORAGE.IS_COMPLETE, 'false');
      this.logInFirstTime();
    }
  }

  loadRole() {
    this.ngxPermissonsService.loadPermissions([this.activeRole]);
    this.isLoaded = true;
  }

  logInFirstTime() {
    if(this.activeRole !== 'ADMIN'){
      this.navigation.navigate(['/perfil/editar/' + sessionStorage.getItem(config.SESSION_STORAGE.ID_USER)]);
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

  redirectButton(route: string) {
    this.navigation.navigate([route]);
  }

}
