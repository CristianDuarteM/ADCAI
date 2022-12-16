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
  isComplete: string;

  constructor(private loginComponent: LoginComponent, public dialog: MatDialog) {
    this.unreadNotification = false;
    this.isComplete = '';
  }

  ngOnInit(): void {
    let notifications = sessionStorage.getItem(config.SESSION_STORAGE.UNREAD_NOTIFICATIONS) || '';
    if(notifications !== '' && notifications === 'true') {
      this.unreadNotification = true;
    }
    this.isComplete = sessionStorage.getItem(config.SESSION_STORAGE.IS_COMPLETE) || '';
  }

  openDialog(): void {
    this.dialog.open(RolesComponent);
  }

  logOut() {
    this.loginComponent.logOut();
  }

}
