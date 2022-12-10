import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { config } from 'src/app/constants/config';
import { Role } from 'src/app/models/Role';
import { UserService } from 'src/app/services/user/user.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';

@Component({
  selector: 'app-roles',
  styleUrls: ['./roles.component.css'],
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {

  isLoaded: boolean;
  roles: {
    [key: string]: boolean
  };

  constructor(private ngxPermissonsService: NgxPermissionsService, private userService: UserService, public dialog: MatDialog) {
    this.isLoaded = false;
    this.roles = {
      admin: false,
      decano: false,
      director: false,
      docente: false
    }
  }

  ngOnInit(): void {
    this.getRoles();
  }

  changeRole(role: string) {
    sessionStorage.setItem("activeRole", role);
    this.ngxPermissonsService.loadPermissions([role]);
    location.replace('/home');
  }

  getRoles() {
    this.userService.getUserById(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) + '').subscribe({
      next: userServiceResponse => {
        this.validateRoles(userServiceResponse.usuario.rols);
      },
      error: (error: HttpErrorResponse) => {
        let route = '/home';
        if(error.status === 401) {
          route = '/login';
        }
        this.openDialog(error.error.msg, route);
      }
    });
  }

  validateRoles(roleList: Role[]) {
    if(roleList !== undefined && roleList !== null){
      for(let i = 0; i < roleList.length; i++){
        this.setValueRole(roleList[i].nombre, 'ADMIN', 'admin');
        this.setValueRole(roleList[i].nombre, 'DECANO', 'decano');
        this.setValueRole(roleList[i].nombre, 'DIRECTOR', 'director');
        this.setValueRole(roleList[i].nombre, 'DOCENTE', 'docente');
      }
    }
    this.isLoaded = true;
  }

  setValueRole(roleActual: string, roleSearched: string, roleField: string) {
    if(roleActual === roleSearched){
      this.roles[roleField] = true;
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

}
