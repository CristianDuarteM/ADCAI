import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DisableDialogComponent } from "../components/disable-dialog/disable-dialog.component";
import { EnableDialogComponent } from "../components/enable-dialog/enable-dialog.component";
import { InformativeDialogComponent } from "../components/informative-dialog/informative-dialog.component";

@Injectable({ providedIn: 'root' })
export class Dialog {
  description: string;
  routeRedirect: string;

  constructor(private dialog: MatDialog) {
    this.description = '';
    this.routeRedirect = '';
  }

  getErrorMessage(error: HttpErrorResponse) {
    let errorMessage = error.error.msg;
    if(errorMessage === undefined){
      errorMessage = error.error.errors[0].msg;
    }
    return errorMessage;
  }

  validateError(routeRedirect: string, error: HttpErrorResponse) {
    if(error.status === 401) {
      sessionStorage.clear();
      routeRedirect = '/login';
    }
    return routeRedirect;
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

  openDialogDisable(description: string, actualComponent: string, idComponent: string) {
    this.dialog.open(DisableDialogComponent, {
      data: {
        description,
        actualComponent,
        idComponent
      }
    });
  }

  openDialogEnable(description: string, actualComponent: string, idComponent: string) {
    this.dialog.open(EnableDialogComponent, {
      data: {
        description,
        actualComponent,
        idComponent
      }
    });
  }

}
