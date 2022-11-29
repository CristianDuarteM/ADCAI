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

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteDepartment = '/gestion-departamentos';
    this.titleDepartment = 'Agregar Departamento';
    this.isPrincipalDepartment = false;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
