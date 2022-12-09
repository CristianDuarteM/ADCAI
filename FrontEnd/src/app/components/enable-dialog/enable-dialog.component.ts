import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { UserService } from 'src/app/services/user/user.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';

@Component({
  selector: 'app-enable-dialog',
  templateUrl: './enable-dialog.component.html',
  styleUrls: ['./enable-dialog.component.css']
})
export class EnableDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {description: string, actualComponent: string, idComponent: number},
  private facultyService: FacultyService, private departmentService: DepartmentService, public dialog: MatDialog,
  private userService: UserService) { }

  ngOnInit(): void {
  }

  enable() {
    if(this.data.actualComponent === 'FACULTAD'){
      this.enableFaculty();
    } else if(this.data.actualComponent === 'DEPARTAMENTO') {
      this.enableDepartment();
    } else if(this.data.actualComponent === 'DOCENTE') {
      this.enableUser();
    }
  }

  enableFaculty() {
    this.facultyService.enableFaculty(this.data.idComponent).subscribe({
      next: enableFacultyResponse => {
        this.openDialog(enableFacultyResponse.msg, '/gestion-facultades');
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, '/gestion-facultades');
      }
    });
  }

  enableDepartment() {
    this.departmentService.enableDepartment(this.data.idComponent).subscribe({
      next: enableDepartmentResponse => {
        this.openDialog(enableDepartmentResponse.msg, '/gestion-departamentos');
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, '/gestion-departamentos');
      }
    });
  }

  enableUser() {
    this.userService.enableUser(this.data.idComponent).subscribe({
      next: enableUserResponse => {
        this.openDialog(enableUserResponse.msg, '/gestion-docentes');
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, '/gestion-docentes');
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
