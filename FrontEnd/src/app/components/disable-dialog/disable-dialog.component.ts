import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';

@Component({
  selector: 'app-disable-dialog',
  templateUrl: './disable-dialog.component.html',
  styleUrls: ['./disable-dialog.component.css']
})
export class DisableDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {description: string, actualComponent: string, idComponent: number},
  private facultyService: FacultyService, private navigation: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  disable() {
    if(this.data.actualComponent === 'FACULTAD'){
      this.disableFaculty();
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
