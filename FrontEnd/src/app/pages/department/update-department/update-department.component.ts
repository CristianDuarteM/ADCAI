import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
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

  constructor(private ngxPermissonsService: NgxPermissionsService, public dialog: MatDialog,
    private departmentService: DepartmentService, private route: ActivatedRoute) {
    this.backRouteDepartment = '/gestion-departamentos';
    this.titleDepartment = 'Detalles del Departamento';
    this.isPrincipalDepartment = false;
    this.actionButtonDepartment = 'Actualizar';
    this.descriptionFormDepartment = 'Actualice los campos que desea modificar del departamento';
    this.dataDepartment = { id: '', nombre: '', descripcion: '', estado: false,
      director: { id: 0, nombre: '', apellido: '', correo: '', realizaCai: false },
      facultad: { id: 0, nombre: '', descripcion: '', estado: false,
      decano: { id: 0, nombre: '', apellido: '', correo: '', realizaCai: false } }};
    this.isLoaded = false;
  }

  ngOnInit(): void {
    let idDepartment = this.route.snapshot.paramMap.get('id') || '';
    this.getDepartment(idDepartment);

    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  getDepartment(id: string) {
    this.departmentService.getDepartmentById(id).subscribe({
      next: departmentData => {
        this.dataDepartment = departmentData;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        let route = '/gestion-departamentos/editar/' + id;
        if(error.status === 401) {
          route = '/login';
        }
        this.openDialog(error.error.msg, route);
      }
    });
  }

  openDialog(description: string, routeRedirect: string) {
    this.dialog.open(InformativeDialogComponent, {
      data: {
        description,
        routeRedirect
      },
      disableClose: true
    });
  }

}
