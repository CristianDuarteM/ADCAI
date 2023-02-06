import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from 'src/app/services/Dialog';
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
    switch(this.data.actualComponent) {
      case 'FACULTAD':
        this.enableFaculty();
        break;
      case 'DEPARTAMENTO':
        this.enableDepartment();
        break;
      case 'DOCENTE':
        this.enableUser();
        break;
      case 'INVESTIGACION':
        this.enableItemInvestigation();
        break;
      case 'EXTENSION':
        this.enableItemExtension();
        break;
      case 'ADMINISTRACION':
        this.enableItemAdministration();
        break;
      case 'REPRESENTACION':
        this.enableItemRepresentation();
        break;
      case 'OTRA':
        this.enableItemOther();
        break;
      case 'NOTA':
        this.enableNote();
        break;
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

  enableItemExtension() {
    this.caiService.enableExtensionItem(this.data.idComponent + '').subscribe({
      next: enableItemExtensionResponse => {
        this.dialog.openDialog(enableItemExtensionResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/', error));
      }
    });
  }

  enableItemAdministration() {
    this.caiService.enableAdministrationItem(this.data.idComponent + '').subscribe({
      next: enableItemAdministrationResponse => {
        this.dialog.openDialog(enableItemAdministrationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/', error));
      }
    });
  }

  enableItemRepresentation() {
    this.caiService.enableRepresentationItem(this.data.idComponent + '').subscribe({
      next: enableItemRepresentationResponse => {
        this.dialog.openDialog(enableItemRepresentationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/', error));
      }
    });
  }

  enableItemOther() {
    this.caiService.enableOtherItem(this.data.idComponent + '').subscribe({
      next: enableItemOtherResponse => {
        this.dialog.openDialog(enableItemOtherResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/', error));
      }
    });
  }

  enableNote() {
    this.caiService.enableNote(this.data.idComponent + '').subscribe({
      next: enableNote => {
        this.dialog.openDialog(enableNote.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/', error));
      }
    });
  }

}
