import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/services/Dialog';
import { CaiResponse } from 'src/app/models/response/CaiResponse';
import { CaiService } from 'src/app/services/cai/cai.service';
import { UserService } from 'src/app/services/user/user.service';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-management-cai',
  templateUrl: './management-cai.component.html',
  styleUrls: ['./management-cai.component.css']
})
export class ManagementCaiComponent implements OnInit {

  backRouteCai: string;
  titleCai: string;
  isPrincipalCai: boolean;
  isCaiActive: boolean;
  caiDataBasic: CaiResponse;
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private navigation: Router, private userService: UserService,
    private dialog: Dialog, private caiService: CaiService) {
    this.backRouteCai = '/home';
    this.titleCai = 'Gestionar Carga Académica Integral';
    this.isPrincipalCai = true;
    this.isCaiActive = false;
    this.caiDataBasic = new CaiResponse();
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.getUser();
  }

  requestCAI() {
    this.navigation.navigate(['/gestion-cai/agregar']);
  }

  updateCAI() {
    this.navigation.navigate(['/gestion-cai/actualizar-periodo']);
  }

  validationCAI() {
    this.navigation.navigate(['/evaluar-cai']);
  }

  getUser() {
    this.userService.getUserById(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '').subscribe({
      next: userServiceResponse => {
        this.caiActive(userServiceResponse.usuario.id_departamento);
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  caiActive(idDepartment: string) {
    this.caiService.getLastCaiByDepartment(idDepartment).subscribe({
      next: caiServiceResponse => {
        this.caiDataBasic = caiServiceResponse;
        if(caiServiceResponse.id !== undefined) {
          if(this.getSemester(new Date()) === caiServiceResponse.semestre) {
            this.isCaiActive = true;
          } else {
            this.isCaiActive = false;
          }
        }
        this.isLoaded = true;
      }
    });
  }

  getSemester(date: Date): number {
    if(date.getMonth() < 6) {
      return 1;
    } else {
      return 2;
    }
  }

}
