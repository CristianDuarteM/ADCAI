import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/models/Dialog';
import { CaiResponse } from 'src/app/models/response/CaiResponse';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiService } from 'src/app/services/cai/cai.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-request-cai',
  templateUrl: './update-request-cai.component.html',
  styleUrls: ['./update-request-cai.component.css']
})
export class UpdateRequestCaiComponent implements OnInit {

  backRouteCai: string;
  titleCai: string;
  isPrincipalCai: boolean;
  dataCai: CaiResponse;
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private userService: UserService, private caiService: CaiService,
    public dialog: Dialog) {
    this.backRouteCai = '/gestion-cai';
    this.titleCai = 'Actualizar CAI';
    this.isPrincipalCai = false;
    this.dataCai = {} as CaiResponse;
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getActualDepartment();
    this.rolePermission.loadRole();
  }

  getActualDepartment() {
    this.userService.getUserById(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) + '').subscribe({
      next: userServiceResponse => {
        this.getActualCai(userServiceResponse.usuario.id_departamento);
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-cai/actualizar-periodo', error));
      }
    });
  }

  getActualCai(idDepartment: string) {
    this.caiService.getCaiByDepartment(idDepartment).subscribe({
      next: caiServiceResponse => {
        this.dataCai = caiServiceResponse;
        if(this.dataCai.semestre == '2') {
          this.dataCai.semestre = 'II';
        } else {
          this.dataCai.semestre = 'I';
        }
        this.dataCai.fecha_inicio = this.formatDate(new Date(this.dataCai.fecha_inicio));
        this.dataCai.fecha_limite = this.formatDate(new Date(this.dataCai.fecha_limite))
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-cai/actualizar-periodo', error));
      }
    });
  }

  formatDate(date: Date) {
    date.setHours(0,0,0,0);
    date.setDate(date.getDate() + 1);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

}
