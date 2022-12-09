import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { FacultyTable } from 'src/app/models/table/FacultyTable';

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
  descriptionActionFaculty: string;
  elementsDataFaculty: FacultyTable[];
  isLoaded: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private facultyService: FacultyService,
    public dialog: MatDialog) {
    this.backRouteFaculty = '/home';
    this.titleFaculty = 'Gestión de Facultades';
    this.isPrincipalFaculty = true;
    this.headerTableFaculty = 'Listado de Facultades';
    this.updateRouteFaculty = '/gestion-facultades/editar';
    this.columnsToDisplayFaculty = ['Id','Nombre', 'Descripción', 'Decano', 'Acción'];
    this.descriptionActionFaculty = 'la facultad seleccionada';
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
        this.elementsDataFaculty = this.getInfoDean(facultyResponse.rows);
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, '/login');
      }
    });
  }

  getInfoDean(facultyList: FacultyResponse[]): FacultyTable[] {
    let facultyData: FacultyTable[] = [];
    for (let i = 0; i < facultyList.length; i++) {
      let nameDean = '';
      if(facultyList[i].decano !== null) {
        nameDean = facultyList[i].decano.correo;
      }
      facultyData[i] = {
        ...facultyList[i],
        decano: nameDean.toLowerCase()
      }
    }
    return facultyData;
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
