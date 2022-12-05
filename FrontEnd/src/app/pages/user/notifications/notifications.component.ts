import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { NotificationModel } from 'src/app/models/NotificationModel';

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
  elementsDataNotifications: NotificationModel[] = [
    { id: '1', from: 'Director de departamento', description: 'El docente ha enviado el CAI a valoración',
    date: new Date('10/10/2022'), state: 'Leído', },
  ];

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteNotifications = '/home';
    this.isPrincipalNotifications = true;
    this.heightTableNotifications = { height: '60vh' };
    this.headerTableNotifications = 'Notificaciones';
    this.columnsToDisplayNotifications = ['Id','De', 'Descripción', 'Fecha', 'Estado'];
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
