import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/services/Dialog';
import { Role } from 'src/app/models/Role';
import { UserService } from 'src/app/services/user/user.service';
import { RolePermission } from 'src/app/services/RolePermission';

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
  userRoles: string[];

  constructor(private rolePermission: RolePermission, private userService: UserService, public dialog: Dialog) {
    this.isLoaded = false;
    this.userRoles = [];
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
    let isComplete = sessionStorage.getItem(config.SESSION_STORAGE.IS_COMPLETE) || '';
    if(this.userRoles.includes('DECANO') && isComplete !== '') {
      role = 'DECANO';
    }
    sessionStorage.setItem("activeRole", role);
    this.rolePermission.loadRole();
    location.replace('/home');
  }

  getRoles() {
    this.userService.getUserById(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) + '').subscribe({
      next: userServiceResponse => {
        this.validateRoles(userServiceResponse.usuario.rols);
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
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
        this.userRoles.push(roleList[i].nombre);
      }
    }
    this.isLoaded = true;
  }

  setValueRole(roleActual: string, roleSearched: string, roleField: string) {
    if(roleActual === roleSearched){
      this.roles[roleField] = true;
    }
  }

}
