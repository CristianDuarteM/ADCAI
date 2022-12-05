import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  backRouteUpdateProfile: string;
  titleUpdateProfile: string;
  isPrincipalUpdateProfile: boolean;
  userModelUpdateProfile: UserModel;
  isEditableUpdateProfile: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteUpdateProfile = '/perfil';
    this.titleUpdateProfile = 'Actualizar Perfil';
    this.isPrincipalUpdateProfile = false;
    this.userModelUpdateProfile = {
      name: 'Pepito', lastName: 'Perez', code: '123456', department: 'Sistemas e Informática', faculty: '', email: 'pepitoperez@ufps.edu.co',
      hasCAI: true, role: ['DIRECTOR', 'DOCENTE'], signature: 'firma.png'
    };
    this.isEditableUpdateProfile = true;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  updateData() {
    this.navigation.navigate(['/perfil']);
  }

}
