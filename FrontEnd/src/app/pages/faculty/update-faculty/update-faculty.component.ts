import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { RolePermission } from 'src/app/models/RolePermission';
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

  constructor(private rolePermission: RolePermission, private route: ActivatedRoute,
    private facultyService: FacultyService, private dialog: Dialog) {
    this.backRouteFaculty = "/gestion-facultades";
    this.titleFaculty = 'Detalles de la Facultad';
    this.isPrincipalFaculty = false;
    this.actionButtonFaculty = 'Actualizar';
    this.descriptionFormFaculty = 'Actualice los campos que desea modificar de la facultad';
    this.dataFaculty = new FacultyResponse();
    this.isLoaded = false;
  }

  ngOnInit(): void {
    let idFaculty = this.route.snapshot.paramMap.get('id') || '';
    this.getFaculty(idFaculty);
    this.rolePermission.loadRole();
  }

  getFaculty(id: string) {
    this.facultyService.getFacultyById(id).subscribe({
      next: facultyData => {
        this.dataFaculty = facultyData;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-facultades/editar/' + id, error));
      }
    });
  }

}
