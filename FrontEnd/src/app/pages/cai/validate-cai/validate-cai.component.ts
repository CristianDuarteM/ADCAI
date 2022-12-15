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
  selector: 'app-validate-cai',
  templateUrl: './validate-cai.component.html',
  styleUrls: ['./validate-cai.component.css']
})
export class ValidateCaiComponent implements OnInit {

  backRouteHistoricalCai: string;
  titleHistoricalCai: string;
  isPrincipalHistoricalCai: boolean;
  isDirector: boolean;
  heightTableHistoricalCai: { height: string };
  columnsToDisplayHistoricalCai: string[];
  headerTableHistoricalCai: string;
  elementsDataHistoricalCai: CaiHistoricalTable[];
  isLoaded: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private caiService: CaiService, public dialog: MatDialog,
    private userService: UserService) {
    this.backRouteHistoricalCai = '/home';
    this.titleHistoricalCai = 'Cargas Académicas Integrales por Evaluar';
    this.isPrincipalHistoricalCai = false;
    this.isDirector = false;
    this.heightTableHistoricalCai = { height: '52vh' };
    this.headerTableHistoricalCai = 'Listado de Cargas Académicas Integrales';
    this.elementsDataHistoricalCai = [];
    this.columnsToDisplayHistoricalCai = ['Código','Nombre Completo', 'Id CAI', 'Año', 'Semestre', 'Departamento','Validar'];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
    if(activeRole === 'DECANO'){
      this.isPrincipalHistoricalCai = true;
    }
    if(activeRole === 'DIRECTOR'){
      this.isDirector = true;
      this.getEvaluateCaiList('director');
    } else if(activeRole === 'DECANO') {
      this.getEvaluateCaiList('decano');
    }
  }

  getEvaluateCaiList(role: string) {
    let idUser = sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '';
    this.caiService.getCaiList(idUser, role, 'si').subscribe({
      next: caiEvaluateListResponse => {
        this.formatDataToTable(caiEvaluateListResponse.rows);
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validateError('/home', error));
      }
    });
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
    console.log(data);
    console.log(this.elementsDataHistoricalCai);
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
