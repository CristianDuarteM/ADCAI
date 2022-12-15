import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../pages/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RolesComponent } from '../roles/roles.component';
import { config } from 'src/app/constants/config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ LoginComponent ]
})
export class NavbarComponent implements OnInit {

  unreadNotification: boolean;

  constructor(private loginComponent: LoginComponent, public dialog: MatDialog) {
    this.unreadNotification = false;
  }

  ngOnInit(): void {
    let notifications = sessionStorage.getItem(config.SESSION_STORAGE.UNREAD_NOTIFICATIONS) || '';
    if(notifications !== '' && notifications === 'true') {
      this.unreadNotification = true;
    }
  }

  openDialog(): void {
    this.dialog.open(RolesComponent);
  }

  logOut() {
    this.loginComponent.logOut();
  }

}
