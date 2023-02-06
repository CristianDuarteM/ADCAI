import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from 'src/app/constants/config';
import { RolePermission } from 'src/app/services/RolePermission';

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

  constructor(private rolePermission: RolePermission, private navigation: Router, private route: ActivatedRoute) {
    let idUser = route.snapshot.paramMap.get('idUser');
    this.backRouteUpdateProfile = '/perfil/' + idUser;
    this.titleUpdateProfile = 'Actualizar Perfil';
    this.isPrincipalUpdateProfile = false;
    this.isEditableUpdateProfile = true;
    this.description = 'Diligencie los campos que desea actualizar';
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    if((sessionStorage.getItem(config.SESSION_STORAGE.IS_COMPLETE) || '') !== ''){
      this.description = 'Diligencie los campos faltantes para continuar';
    }
  }

}
