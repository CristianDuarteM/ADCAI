import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../pages/login/login.component';
import { MatDialog } from '@angular/material/dialog';
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
    this.dialog.open(RolesComponent);
  }

  logOut() {
    this.loginComponent.logOut();
  }

}
