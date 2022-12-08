import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { Faculty } from 'src/app/models/Faculty';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';

@Component({
  selector: 'app-management-faculty',
  templateUrl: './management-faculty.component.html',
  styleUrls: ['./management-faculty.component.css']
})
export class ManagementFacultyComponent implements OnInit {

  backRouteFaculty: string;
  titleFaculty: string;
  isPrincipalFaculty: boolean;
  columnsToDisplayFaculty: string[];
  headerTableFaculty: string;
  updateRouteFaculty: string;
  descriptionDisableFaculty: string;
  elementsDataFaculty: Faculty[];
  isLoaded: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private facultyService: FacultyService,
    public dialog: MatDialog) {
    this.backRouteFaculty = '/home';
    this.titleFaculty = 'Gestión de Facultades';
    this.isPrincipalFaculty = true;
    this.headerTableFaculty = 'Listado de Facultades';
    this.updateRouteFaculty = '/gestion-facultades/editar';
    this.columnsToDisplayFaculty = ['Id','Nombre', 'Descripción', 'Decano', 'Acción'];
    this.descriptionDisableFaculty = '¿Está seguro de deshabilitar la facultad seleccionada?';
    this.elementsDataFaculty = [];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getListFaculty();
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  getListFaculty() {
    this.facultyService.getFacultyList().subscribe({
      next: facultyResponse => {
        this.elementsDataFaculty = facultyResponse.rows;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, '/login');
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
