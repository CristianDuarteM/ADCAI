import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { CaiModel } from 'src/app/models/CaiModel';

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
  elementsDataHistoricalCai: CaiModel[] = [];

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteHistoricalCai = '/home';
    this.titleHistoricalCai = 'Historial de los CAI';
    this.isPrincipalHistoricalCai = true;
    this.isDirector = false;
    this.heightTableHistoricalCai = { height: '45vh' };
    this.headerTableHistoricalCai = 'Listado de Cargas Académicas Integrales';
    this.buttonRouteHistoricalCai = '/historial-cai/ver';
    this.columnsToDisplayHistoricalCai = ['Código','Nombre Completo', 'Id CAI', 'Año', 'Semestre', 'Departamento','Acción']
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
    if(activeRole === 'DIRECTOR'){
      this.isDirector = true;
    }
  }

}
