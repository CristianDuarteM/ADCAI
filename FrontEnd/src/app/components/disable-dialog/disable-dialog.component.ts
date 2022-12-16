import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from 'src/app/models/Dialog';
import { CaiService } from 'src/app/services/cai/cai.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-disable-dialog',
  templateUrl: './disable-dialog.component.html',
  styleUrls: ['./disable-dialog.component.css']
})
export class DisableDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {description: string, actualComponent: string, idComponent: number},
  private facultyService: FacultyService, public dialog: Dialog, private departmentService: DepartmentService,
  private userService: UserService, private caiService: CaiService) { }

  ngOnInit(): void {
  }

  disable() {
    if(this.data.actualComponent === 'FACULTAD'){
      this.disableFaculty();
    } else if(this.data.actualComponent === 'DEPARTAMENTO') {
      this.disableDepartment();
    } else if(this.data.actualComponent === 'DOCENTE') {
      this.disableTeacher();
    } else if(this.data.actualComponent === 'INVESTIGACION') {
      this.disableItemInvestigation();
    }
  }

  disableFaculty() {
    this.facultyService.disableFaculty(this.data.idComponent).subscribe({
      next: disableFacultyResponse => {
        this.dialog.openDialog(disableFacultyResponse.msg, '/gestion-facultades');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-facultades', error));
      }
    });
  }

  disableDepartment() {
    this.departmentService.disableDepartment(this.data.idComponent).subscribe({
      next: disableDepartmentResponse => {
        this.dialog.openDialog(disableDepartmentResponse.msg, '/gestion-departamentos');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-departamentos', error));
      }
    });
  }

  disableTeacher() {
    this.userService.disableUser(this.data.idComponent).subscribe({
      next: disableUserResponse => {
        this.dialog.openDialog(disableUserResponse.msg, '/gestion-docentes/');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-docentes', error));
      }
    });
  }

  disableItemInvestigation() {
    this.caiService.disableInvestigationItem(this.data.idComponent + '').subscribe({
      next: disableItemInvestigationResponse => {
        this.dialog.openDialog(disableItemInvestigationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

}
