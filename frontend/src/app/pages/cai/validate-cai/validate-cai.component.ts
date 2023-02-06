import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { Cai } from 'src/app/models/Cai';
import { Dialog } from 'src/app/services/Dialog';
import { CaiHistoricalResponse } from 'src/app/models/response/CaiHistoricalResponse';
import { CaiTable } from 'src/app/models/table/CaiTable';
import { CaiService } from 'src/app/services/cai/cai.service';
import { RolePermission } from 'src/app/services/RolePermission';

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
  elementsDataHistoricalCai: CaiTable[];
  isLoaded: boolean;
  dataCai: Cai;

  constructor(private rolePermission: RolePermission, private caiService: CaiService, public dialog: Dialog) {
    this.backRouteHistoricalCai = '/home';
    this.titleHistoricalCai = 'Cargas Académicas Integrales por Evaluar';
    this.isPrincipalHistoricalCai = false;
    this.isDirector = false;
    this.heightTableHistoricalCai = { height: '52vh' };
    this.headerTableHistoricalCai = 'Listado de Cargas Académicas Integrales';
    this.elementsDataHistoricalCai = [];
    this.columnsToDisplayHistoricalCai = ['Código','Nombre Completo', 'Id CAI', 'Año', 'Semestre', 'Departamento','Validar'];
    this.isLoaded = false;
    this.dataCai = new Cai();
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.rolePermission.loadRole();
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
        this.dataCai = caiEvaluateListResponse.rows;
        this.formatDataToTable(caiEvaluateListResponse.rows);
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
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
        id_estado: data[i].id_estado,
      });
    }
    this.isLoaded = true;
  }

}
