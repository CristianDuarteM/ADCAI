import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { InformativeDialogComponent } from "../components/informative-dialog/informative-dialog.component";

@Injectable({ providedIn: 'root' })
export class Dialog {
  description: string;
  routeRedirect: string;

  constructor(private dialog: MatDialog) {
    this.description = '';
    this.routeRedirect = '';
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
