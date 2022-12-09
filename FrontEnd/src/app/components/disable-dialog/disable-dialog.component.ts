import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { UserService } from 'src/app/services/user/user.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';

@Component({
  selector: 'app-disable-dialog',
  templateUrl: './disable-dialog.component.html',
  styleUrls: ['./disable-dialog.component.css']
})
export class DisableDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {description: string, actualComponent: string, idComponent: number},
  private facultyService: FacultyService, public dialog: MatDialog, private departmentService: DepartmentService,
  private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  disable() {
    if(this.data.actualComponent === 'FACULTAD'){
      this.disableFaculty();
    } else if(this.data.actualComponent === 'DEPARTAMENTO') {
      this.disableDepartment();
    } else if(this.data.actualComponent === 'DOCENTE') {
      this.disableTeacher();
    }
  }

  disableFaculty() {
    this.facultyService.disableFaculty(this.data.idComponent).subscribe({
      next: disableFacultyResponse => {
        this.openDialog(disableFacultyResponse.msg, '/gestion-facultades');
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, '/gestion-facultades');
      }
    });
  }

  disableDepartment() {
    this.departmentService.disableDepartment(this.data.idComponent).subscribe({
      next: disableDepartmentResponse => {
        this.openDialog(disableDepartmentResponse.msg, '/gestion-departamentos');
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, '/gestion-departamentos');
      }
    });
  }

  disableTeacher() {
    this.userService.disableUser(this.data.idComponent).subscribe({
      next: disableUserResponse => {
        this.openDialog(disableUserResponse.msg, '/gestion-docentes/');
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
