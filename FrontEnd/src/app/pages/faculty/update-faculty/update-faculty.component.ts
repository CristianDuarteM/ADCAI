import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { FacultyService } from 'src/app/services/faculty/faculty.service';

@Component({
  selector: 'app-update-faculty',
  templateUrl: './update-faculty.component.html',
  styleUrls: ['./update-faculty.component.css']
})
export class UpdateFacultyComponent implements OnInit {

  backRouteFaculty: string;
  titleFaculty: string;
  isPrincipalFaculty: boolean;
  actionButtonFaculty: string;
  descriptionFormFaculty: string;
  dataFaculty: FacultyResponse;
  isLoaded: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private route: ActivatedRoute,
    private facultyService: FacultyService, public dialog: MatDialog) {
    this.backRouteFaculty = "/gestion-facultades";
    this.titleFaculty = 'Detalles de la Facultad';
    this.isPrincipalFaculty = false;
    this.actionButtonFaculty = 'Actualizar';
    this.descriptionFormFaculty = 'Actualice los campos que desea modificar de la facultad';
    this.dataFaculty = {
      id: 0, nombre: '', descripcion: '', estado: false, decano: { id: 0, nombre: '', apellido: '', correo: '', realizaCai: false }
    };
    this.isLoaded = false;
  }

  ngOnInit(): void {
    let idFaculty = this.route.snapshot.paramMap.get('id') || '';
    this.getFaculty(idFaculty);

    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  getFaculty(id: string) {
    this.facultyService.getFacultyById(id).subscribe({
      next: facultyData => {
        this.dataFaculty = facultyData;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        let route = '/gestion-facultades/editar/' + id;
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
