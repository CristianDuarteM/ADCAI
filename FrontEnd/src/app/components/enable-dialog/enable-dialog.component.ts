import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from 'src/app/models/Dialog';
import { CaiService } from 'src/app/services/cai/cai.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-enable-dialog',
  templateUrl: './enable-dialog.component.html',
  styleUrls: ['./enable-dialog.component.css']
})
export class EnableDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {description: string, actualComponent: string, idComponent: number},
  private facultyService: FacultyService, private departmentService: DepartmentService, public dialog: Dialog,
  private userService: UserService, private caiService: CaiService) { }

  ngOnInit(): void {
  }

  enable() {
    if(this.data.actualComponent === 'FACULTAD'){
      this.enableFaculty();
    } else if(this.data.actualComponent === 'DEPARTAMENTO') {
      this.enableDepartment();
    } else if(this.data.actualComponent === 'DOCENTE') {
      this.enableUser();
    } else if(this.data.actualComponent === 'INVESTIGACION') {
      this.enableItemInvestigation();
    }
  }

  enableFaculty() {
    this.facultyService.enableFaculty(this.data.idComponent).subscribe({
      next: enableFacultyResponse => {
        this.dialog.openDialog(enableFacultyResponse.msg, '/gestion-facultades');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-facultades', error));
      }
    });
  }

  enableDepartment() {
    this.departmentService.enableDepartment(this.data.idComponent).subscribe({
      next: enableDepartmentResponse => {
        this.dialog.openDialog(enableDepartmentResponse.msg, '/gestion-departamentos');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-departamentos', error));
      }
    });
  }

  enableUser() {
    this.userService.enableUser(this.data.idComponent).subscribe({
      next: enableUserResponse => {
        this.dialog.openDialog(enableUserResponse.msg, '/gestion-docentes');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-docentes', error));
      }
    });
  }

  enableItemInvestigation() {
    this.caiService.enableInvestigationItem(this.data.idComponent + '').subscribe({
      next: enableItemInvestigationResponse => {
        this.dialog.openDialog(enableItemInvestigationResponse.msg, '/cai-admin/');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/', error));
      }
    });
  }

}
