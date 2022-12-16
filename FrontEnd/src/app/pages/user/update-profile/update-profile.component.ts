import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { config } from 'src/app/constants/config';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  backRouteUpdateProfile: string;
  titleUpdateProfile: string;
  isPrincipalUpdateProfile: boolean;
  isEditableUpdateProfile: boolean;
  description: string;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteUpdateProfile = '/perfil';
    this.titleUpdateProfile = 'Actualizar Perfil';
    this.isPrincipalUpdateProfile = false;
    this.isEditableUpdateProfile = true;
    this.description = 'Diligencie los campos que desea actualizar';
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
    if((sessionStorage.getItem(config.SESSION_STORAGE.IS_COMPLETE) || '') !== ''){
      this.description = 'Diligencie los campos faltantes para continuar';
    }
  }

  updateData() {
    this.navigation.navigate(['/perfil']);
  }

}
