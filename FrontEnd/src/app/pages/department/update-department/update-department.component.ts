import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
import { RolePermission } from 'src/app/models/RolePermission';
import { DepartmentService } from 'src/app/services/department/department.service';

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
  dataDepartment: DepartmentResponse;
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private dialog: Dialog,
    private departmentService: DepartmentService, private route: ActivatedRoute) {
    this.backRouteDepartment = '/gestion-departamentos';
    this.titleDepartment = 'Detalles del Departamento';
    this.isPrincipalDepartment = false;
    this.actionButtonDepartment = 'Actualizar';
    this.descriptionFormDepartment = 'Actualice los campos que desea modificar del departamento';
    this.dataDepartment = {} as DepartmentResponse;
    this.isLoaded = false;
  }

  ngOnInit(): void {
    let idDepartment = this.route.snapshot.paramMap.get('id') || '';
    this.getDepartment(idDepartment);
    this.rolePermission.loadRole();
  }

  getDepartment(id: string) {
    this.departmentService.getDepartmentById(id).subscribe({
      next: departmentData => {
        this.dataDepartment = departmentData;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error),
        this.dialog.validateError('/gestion-departamentos/editar/' + id, error));
      }
    });
  }

}
