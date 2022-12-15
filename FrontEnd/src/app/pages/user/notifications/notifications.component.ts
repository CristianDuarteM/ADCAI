import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { config } from 'src/app/constants/config';
import { NotificationResponse } from 'src/app/models/response/NotificationResponse';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  backRouteNotifications: string;
  isPrincipalNotifications: boolean;
  heightTableNotifications: { height: string };
  columnsToDisplayNotifications: string[];
  headerTableNotifications: string;
  elementsDataNotifications: NotificationResponse[];
  isLoaded: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private userService: UserService, public dialog: MatDialog) {
    this.backRouteNotifications = '/home';
    this.isPrincipalNotifications = true;
    this.heightTableNotifications = { height: '60vh' };
    this.headerTableNotifications = 'Notificaciones';
    this.elementsDataNotifications = [];
    this.columnsToDisplayNotifications = ['Id', 'Mensaje', 'Fecha', 'Estado'];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
    this.getNotifications();
  }

  getNotifications() {
    this.userService.getNotificationsByIdUser(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) + '').subscribe({
      next: notificationsResponse => {
        this.elementsDataNotifications = notificationsResponse.rows;
        this.elementsDataNotifications.forEach(element => {
          let date = new Date(element.createdAt);
          element.createdAt = date.toLocaleDateString();
        });
        if(sessionStorage.getItem(config.SESSION_STORAGE.UNREAD_NOTIFICATIONS) !== null) {
          sessionStorage.removeItem(config.SESSION_STORAGE.UNREAD_NOTIFICATIONS);
        }
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        let route = '/motificaciones';
        if(error.status === 401) {
          sessionStorage.clear();
          route = '/login';
        }
        this.openDialog(error.error.msg, route);
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
