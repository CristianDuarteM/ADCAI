import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';

@Component({
  selector: 'app-disable-dialog',
  templateUrl: './disable-dialog.component.html',
  styleUrls: ['./disable-dialog.component.css']
})
export class DisableDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {description: string, actualComponent: string, idComponent: number},
  private facultyService: FacultyService, public dialog: MatDialog, private departmentService: DepartmentService) { }

  ngOnInit(): void {
  }

  disable() {
    if(this.data.actualComponent === 'FACULTAD'){
      this.disableFaculty();
    } else if(this.data.actualComponent === 'DEPARTAMENTO') {
      this.disableDepartment();
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
