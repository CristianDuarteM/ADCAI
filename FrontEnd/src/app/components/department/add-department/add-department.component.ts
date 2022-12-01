import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  backRouteDepartment: string;
  titleDepartment: string;
  isPrincipalDepartment: boolean;
  actionButtonDepartment: string;
  descriptionFormDepartment: string;

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteDepartment = '/gestion-departamentos';
    this.titleDepartment = 'Agregar Departamento';
    this.isPrincipalDepartment = false;
    this.actionButtonDepartment = 'Guardar';
    this.descriptionFormDepartment = 'Diligencie los campos requeridos para agregar un departamento';
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
