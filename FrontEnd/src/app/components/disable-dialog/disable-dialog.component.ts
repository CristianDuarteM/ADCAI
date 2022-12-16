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
    switch(this.data.actualComponent) {
      case 'FACULTAD':
        this.disableFaculty();
        break;
      case 'DEPARTAMENTO':
        this.disableDepartment();
        break;
      case 'DOCENTE':
        this.disableTeacher();
        break;
      case 'INVESTIGACION':
        this.disableItemInvestigation();
        break;
      case 'EXTENSION':
        this.disableItemExtension();
        break;
      case 'ADMINISTRACION':
        this.disableItemAdministration();
        break;
      case 'REPRESENTACION':
        this.disableItemRepresentation();
        break;
      case 'OTRA':
        this.disableItemOther();
        break;
      case 'NOTA':
        this.disableNote();
        break;
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

  disableItemExtension() {
    this.caiService.disableExtensionItem(this.data.idComponent + '').subscribe({
      next: disableItemExtensionResponse => {
        this.dialog.openDialog(disableItemExtensionResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  disableItemAdministration() {
    this.caiService.disableAdministrationItem(this.data.idComponent + '').subscribe({
      next: disableItemAdministrationResponse => {
        this.dialog.openDialog(disableItemAdministrationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  disableItemRepresentation() {
    this.caiService.disableRepresentationItem(this.data.idComponent + '').subscribe({
      next: disableItemRepresentationResponse => {
        this.dialog.openDialog(disableItemRepresentationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  disableItemOther() {
    this.caiService.disableOtherItem(this.data.idComponent + '').subscribe({
      next: disableItemOtherResponse => {
        this.dialog.openDialog(disableItemOtherResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  disableNote() {
    this.caiService.disableNote(this.data.idComponent + '').subscribe({
      next: disableNote => {
        this.dialog.openDialog(disableNote.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

}
