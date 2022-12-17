import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolePermission } from 'src/app/models/RolePermission';

@Component({
  selector: 'app-management-cai',
  templateUrl: './management-cai.component.html',
  styleUrls: ['./management-cai.component.css']
})
export class ManagementCaiComponent implements OnInit {

  backRouteCai: string;
  titleCai: string;
  isPrincipalCai: boolean;

  constructor(private rolePermission: RolePermission, private navigation: Router) {
    this.backRouteCai = '/home';
    this.titleCai = 'Gestionar Carga Académica Integral';
    this.isPrincipalCai = true;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

  requestCAI() {
    this.navigation.navigate(['/gestion-cai/agregar']);
  }

  updateCAI() {
    this.navigation.navigate(['/gestion-cai/actualizar-periodo']);
  }

  validationCAI() {
    this.navigation.navigate(['/evaluar-cai']);
  }

}
