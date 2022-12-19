import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/models/Dialog';
import { NotificationResponse } from 'src/app/models/response/NotificationResponse';
import { RolePermission } from 'src/app/models/RolePermission';
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

  constructor(private rolePermission: RolePermission, private userService: UserService, public dialog: Dialog) {
    this.backRouteNotifications = '/home';
    this.isPrincipalNotifications = true;
    this.heightTableNotifications = { height: '60vh' };
    this.headerTableNotifications = 'Notificaciones';
    this.elementsDataNotifications = [];
    this.columnsToDisplayNotifications = ['Id', 'Mensaje', 'Fecha', 'Estado'];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.getNotifications();
  }

  getNotifications() {
    this.userService.getNotificationsByIdUser(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) + '',
    sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE) || '').subscribe({
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
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/motificaciones', error));
      }
    });
  }

}
