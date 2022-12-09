import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  backRouteProfile: string;
  titleProfile: string;
  isPrincipalProfile: boolean;
  isEditableViewProfile: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteProfile = '/home';
    this.titleProfile = 'Perfil';
    this.isPrincipalProfile = true;
    this.isEditableViewProfile = false;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  updateData() {
    this.navigation.navigate(['/perfil/editar']);
  }

}
