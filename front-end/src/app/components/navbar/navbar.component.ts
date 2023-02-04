import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../pages/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RolesComponent } from '../roles/roles.component';
import { config } from 'src/app/constants/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ LoginComponent ]
})
export class NavbarComponent implements OnInit {

  unreadNotification: boolean;
  isComplete: string;
  changeRole: boolean;

  constructor(private loginComponent: LoginComponent, public dialog: MatDialog, private navigation: Router) {
    this.unreadNotification = false;
    this.isComplete = '';
    this.changeRole = true;
  }

  ngOnInit(): void {
    let notifications = sessionStorage.getItem(config.SESSION_STORAGE.UNREAD_NOTIFICATIONS) || '';
    if(notifications !== '' && notifications === 'true') {
      this.unreadNotification = true;
    }
    let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE) || '';
    this.isComplete = sessionStorage.getItem(config.SESSION_STORAGE.IS_COMPLETE) || '';
    if(this.isComplete !== '' && activeRole !== 'ADMIN') {
      this.changeRole = false;
    }
  }

  openDialog(): void {
    this.dialog.open(RolesComponent);
  }

  logOut() {
    this.loginComponent.logOut();
  }

  redirectButton(route: string) {
    this.navigation.navigate([route]);
  }

}
