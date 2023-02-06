import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { FacultyTable } from 'src/app/models/table/FacultyTable';
import { Dialog } from 'src/app/services/Dialog';
import { Router } from '@angular/router';
import { RolePermission } from 'src/app/services/RolePermission';

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

  constructor(private rolePermission: RolePermission, private facultyService: FacultyService, private dialog: Dialog,
    private navigation: Router) {
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
    this.rolePermission.loadRole();
  }

  getListFaculty() {
    this.facultyService.getFacultyList().subscribe({
      next: facultyResponse => {
        this.elementsDataFaculty = this.getInfoDean(facultyResponse.rows);
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
      }
    });
  }

  getInfoDean(facultyList: FacultyResponse[]): FacultyTable[] {
    let facultyData: FacultyTable[] = [];
    for (let i = 0; i < facultyList.length; i++) {
      let emailDean = '';
      if(facultyList[i].decano !== null) {
        emailDean = facultyList[i].decano.correo;
      }
      facultyData[i] = {
        ...facultyList[i],
        decano: emailDean.toLowerCase()
      }
    }
    return facultyData;
  }

  redirectButton() {
    this.navigation.navigate(['/gestion-facultades/agregar']);
  }

}
