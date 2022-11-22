import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ LoginComponent ]
})
export class NavbarComponent implements OnInit {

  constructor(private loginComponent: LoginComponent, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    let dc = new MatDialogConfig();
    const dialogRef = this.dialog.open(RolesComponent, dc);
    dc.autoFocus = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logOut() {
    this.loginComponent.logOut();
  }

}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "../roles/roles.component.html"
})
export class DialogOverviewExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
