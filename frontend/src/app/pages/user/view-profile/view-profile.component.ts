import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermission } from 'src/app/services/RolePermission';

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

  constructor(private rolePermission: RolePermission, private navigation: Router, private route: ActivatedRoute) {
    this.backRouteProfile = '/home';
    this.titleProfile = 'Perfil';
    this.isPrincipalProfile = true;
    this.isEditableViewProfile = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

  updateData() {
    let idUser = this.route.snapshot.paramMap.get('idUser');
    this.navigation.navigate(['/perfil/editar/' + idUser]);
  }

}
