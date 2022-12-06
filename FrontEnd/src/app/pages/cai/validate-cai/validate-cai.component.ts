import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { CaiModel } from 'src/app/models/CaiModel';

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
  elementsDataHistoricalCai: CaiModel[] = [
    {id: '001', semester: 'II', year: '2022', date: new Date(), teacher: {code: '123456', name: 'Pepito', lastName: 'Perez', email: 'pepitoperez@ufps.edu.co',
    hasCAI: true, role: ['DOCENTE'], faculty: '', department: 'Sistemas e informática', signature: ''}},
  ];

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteHistoricalCai = '/home';
    this.titleHistoricalCai = 'Cargas Académicas Integrales por Evaluar';
    this.isPrincipalHistoricalCai = false;
    this.isDirector = false;
    this.heightTableHistoricalCai = { height: '52vh' };
    this.headerTableHistoricalCai = 'Listado de Cargas Académicas Integrales';
    this.columnsToDisplayHistoricalCai = ['Código','Nombre Completo', 'Id CAI', 'Año', 'Semestre', 'Departamento','Validar']
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
    if(activeRole === 'DECANO'){
      this.isPrincipalHistoricalCai = true;
    }
    if(activeRole === 'DIRECTOR'){
      this.isDirector = true;
    }
  }

}
