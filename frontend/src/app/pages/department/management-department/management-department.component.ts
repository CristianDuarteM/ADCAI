import { Component, OnInit } from '@angular/core';
import { DepartmentTable } from 'src/app/models/table/DepartmentTable';
import { DepartmentService } from 'src/app/services/department/department.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
import { Dialog } from 'src/app/services/Dialog';
import { Router } from '@angular/router';
import { RolePermission } from 'src/app/services/RolePermission';

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
  descriptionActionDepartment: string;
  elementsDataDepartment: DepartmentTable[];
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private departmentService: DepartmentService,
    private dialog: Dialog, private navigation: Router) {
    this.backRouteDepartment = '/home';
    this.titleDepartment = 'Gestión de Departamentos';
    this.isPrincipalDepartment = true;
    this.headerTableDepartment = 'Listado de Departamentos';
    this.updateRouteDepartment = '/gestion-departamentos/editar';
    this.columnsToDisplayDepartment = ['Id','Nombre', 'Descripción', 'Director', 'Acción'];
    this.descriptionActionDepartment = 'el departamento seleccionado';
    this.elementsDataDepartment = [];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getListDepartment();
    this.rolePermission.loadRole();
  }

  getListDepartment() {
    this.departmentService.getDepartmentList().subscribe({
      next: departmentResponse => {
        this.elementsDataDepartment = this.getInfoDirector(departmentResponse.rows);
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
      }
    });
  }

  getInfoDirector(departmentList: DepartmentResponse[]): DepartmentTable[] {
    let departmentData: DepartmentTable[] = [];
    for(let i = 0; i < departmentList.length; i++) {
      let emailDirector = '';
      if(departmentList[i].director !== null) {
        emailDirector = departmentList[i].director.correo;
      }
      departmentData[i] = {
        ...departmentList[i],
        director: emailDirector.toLowerCase()
      }
    }
    return departmentData;
  }

  redirectButton() {
    this.navigation.navigate(['/gestion-departamentos/agregar']);
  }

}
