import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-management-cai',
  templateUrl: './management-cai.component.html',
  styleUrls: ['./management-cai.component.css']
})
export class ManagementCaiComponent implements OnInit {

  backRouteCai: string;
  titleCai: string;
  isPrincipalCai: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteCai = '/home';
    this.titleCai = 'Gestionar Carga Académica Integral';
    this.isPrincipalCai = true;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  requestCAI() {
    this.navigation.navigate(['/gestion-cai/request']);
  }

  updateCAI() {
    this.navigation.navigate(['/gestion-cai/update-request']);
  }

  validationCAI() {
    this.navigation.navigate(['/evaluar-cai']);
  }

}
