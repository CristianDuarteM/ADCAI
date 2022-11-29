import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { DepartmentModel } from 'src/app/models/DepartmentModel';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  backRouteDepartment: string;
  titleDepartment: string;
  isPrincipalDepartment: boolean;
  actionButtonDepartment: string;
  descriptionFormDepartment: string;
  dataDepartment: DepartmentModel;

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteDepartment = '/gestion-departamentos';
    this.titleDepartment = 'Detalles del Departamento';
    this.isPrincipalDepartment = false;
    this.actionButtonDepartment = 'Actualizar';
    this.descriptionFormDepartment = 'Actualice los campos que desea modificar del departamento';
    this.dataDepartment = { id: '2', name: 'Sistemas e Informática 2', description: 'El departamento de sistemas e informática 2 busca...',
    director: 'Pepita Perez' };
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
