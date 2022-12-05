import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  backRouteProfile: string;
  titleProfile: string;
  isPrincipalProfile: boolean;
  userModelViewProfile: UserModel;
  isEditableViewProfile: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteProfile = '/home';
    this.titleProfile = 'Perfil';
    this.isPrincipalProfile = true;
    this.userModelViewProfile = {
      name: 'Pepito', lastName: 'Perez', code: '123456', department: 'Sistemas e Informática', faculty: '', email: 'pepitoperez@ufps.edu.co',
      hasCAI: true, role: ['DIRECTOR', 'DOCENTE'], signature: 'firma.png'
    };
    this.isEditableViewProfile = false;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
