import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from 'src/app/models/DepartmentModel';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-management-department',
  templateUrl: './management-department.component.html',
  styleUrls: ['./management-department.component.css']
})
export class ManagementDepartmentComponent implements OnInit {

  backRouteDepartment: string;
  titleDepartment: string;
  isPrincipalDepartment: boolean;
  columnsToDisplayDepartment: string[];
  headerTableDepartment: string;
  updateRouteDepartment: string;
  disableRouteDepartment: string;
  elementsDataDepartment: DepartmentModel[] = [
    {id: '1', name: 'Sistemas e Informática', description: 'El departamento de sistemas e informática busca...',
    director: 'Pepito Perez'},
  ];

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteDepartment = '/home';
    this.titleDepartment = 'Gestión de Departamentos';
    this.isPrincipalDepartment = true;
    this.headerTableDepartment = 'Listado de Departamentos';
    this.updateRouteDepartment = '/gestion-departamentos/editar';
    this.disableRouteDepartment = '';
    this.columnsToDisplayDepartment = ['Id','Nombre', 'Descripción', 'Director', 'Acción'];
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
