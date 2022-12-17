import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/models/Dialog';
import { CaiHistoricalResponse } from 'src/app/models/response/CaiHistoricalResponse';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiHistoricalTable } from 'src/app/models/table/CaiHistoricalTable';
import { CaiService } from 'src/app/services/cai/cai.service';

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

  constructor(private rolePermission: RolePermission, private caiService: CaiService, public dialog: Dialog) {
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
    this.rolePermission.loadRole();
    if(activeRole === 'DIRECTOR'){
      this.isDirector = true;
      this.getHistoricalCaiByRole('director');
    } else if(activeRole === 'DOCENTE') {
      this.getHistoricalCaiByRole('docente');
    } else if(activeRole === 'DECANO') {
      this.getHistoricalCaiByRole('decano');
    }
  }

  getHistoricalCaiByRole(role: string) {
    let idUser = sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '';
    this.caiService.getCaiList(idUser, role, 'no').subscribe({
      next: caiHistoricalResponse => {
        this.formatDataToTable(caiHistoricalResponse.rows);
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
      });
    }
    this.isLoaded = true;
  }

}
