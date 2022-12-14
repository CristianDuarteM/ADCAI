import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { config } from 'src/app/constants/config';
import { CaiHistoricalResponse } from 'src/app/models/response/CaiHistoricalResponse';
import { CaiHistoricalTable } from 'src/app/models/table/CaiHistoricalTable';
import { CaiService } from 'src/app/services/cai/cai.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {

  backRouteHistoricalCai: string;
  titleHistoricalCai: string;
  isPrincipalHistoricalCai: boolean;
  isDirector: boolean;
  heightTableHistoricalCai: { height: string };
  columnsToDisplayHistoricalCai: string[];
  headerTableHistoricalCai: string;
  buttonRouteHistoricalCai: string;
  elementsDataHistoricalCai: CaiHistoricalTable[];
  isLoaded: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private caiService: CaiService, public dialog: MatDialog,
    private userService: UserService) {
    this.backRouteHistoricalCai = '/home';
    this.titleHistoricalCai = 'Historial de los CAI';
    this.isPrincipalHistoricalCai = true;
    this.isDirector = false;
    this.heightTableHistoricalCai = { height: '45vh' };
    this.headerTableHistoricalCai = 'Listado de Cargas Académicas Integrales';
    this.buttonRouteHistoricalCai = '/historial-cai/ver/';
    this.elementsDataHistoricalCai = [];
    this.columnsToDisplayHistoricalCai = ['Código','Nombre Completo', 'Id CAI', 'Año', 'Semestre', 'Departamento','Acción'];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
    if(activeRole === 'DIRECTOR'){
      this.isDirector = true;
      this.getHistoricalCaiDirector();
    } else if(activeRole === 'DOCENTE') {
      this.getHistoricalCaiTeacher();
    }
  }

  getHistoricalCaiTeacher() {
    let idUser = sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '';
    this.caiService.getCaiListByUser(idUser).subscribe({
      next: caiHistoricalTeacherResponse => {
        this.formatDataToTable(caiHistoricalTeacherResponse.rows);
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validateError('/home', error));
      }
    });
  }

  getHistoricalCaiDirector() {
    let idUser = sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '';
    this.userService.getUserById(idUser).subscribe({
      next: userResponse => {
        this.caiService.getCaiListByDepartmentAndEvaluate(userResponse.usuario.id_departamento, 'no').subscribe({
          next: caiHistoricalDirectorResponse => {
            this.formatDataToTable(caiHistoricalDirectorResponse.rows);
          },
          error: (error: HttpErrorResponse) => {
            this.openDialog(error.error.msg, this.validateError('/home', error));
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validateError('/home', error));
      }
    });
  }

  getHistoricalCaiDean() {

  }

  formatDataToTable(data: CaiHistoricalResponse[]) {
    this.elementsDataHistoricalCai = [];
    for(let i = 0; i < data.length; i++) {
      this.elementsDataHistoricalCai.push({
        codigo: data[i].usuario.codigo,
        nombre: data[i].usuario.nombre + ' ' + data[i].usuario.apellido,
        id: data[i].id,
        anno: data[i].periodo.anno,
        semestre: data[i].periodo.semestre,
        departamento: data[i].usuario.departamento.nombre,
      });
    }
    this.isLoaded = true;
  }

  validateError(route: string, error: HttpErrorResponse) {
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
