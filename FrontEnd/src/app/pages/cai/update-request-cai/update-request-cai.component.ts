import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { config } from 'src/app/constants/config';
import { CaiResponse } from 'src/app/models/response/CaiResponse';
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

  constructor(private ngxPermissonsService: NgxPermissionsService, private userService: UserService, private caiService: CaiService,
    public dialog: MatDialog) {
    this.backRouteCai = '/gestion-cai';
    this.titleCai = 'Actualizar CAI';
    this.isPrincipalCai = false;
    this.dataCai = {} as CaiResponse;
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getActualDepartment();
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  getActualDepartment() {
    this.userService.getUserById(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) + '').subscribe({
      next: userServiceResponse => {
        this.getActualCai(userServiceResponse.usuario.id_departamento);
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.getRedirectRoute(error));
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
        this.openDialog(error.error.msg, this.getRedirectRoute(error));
      }
    });
  }

  formatDate(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  getRedirectRoute(error: HttpErrorResponse) {
    let route = '/gestion-cai/actualizar-periodo';
    if(error.status === 401) {
      route = '/login';
    }
    return route;
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
