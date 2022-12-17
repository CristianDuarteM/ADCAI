import { Component, OnInit } from '@angular/core';
import { RolePermission } from 'src/app/models/RolePermission';

@Component({
  selector: 'app-fill-cai',
  templateUrl: './fill-cai.component.html',
  styleUrls: ['./fill-cai.component.css']
})
export class FillCaiComponent implements OnInit {

  backRouteFillCai: string;
  titleFillCai: string;
  isPrincipalFillCai: boolean;

  constructor(private rolePermission: RolePermission) {
    this.backRouteFillCai = '/home';
    this.titleFillCai = 'Diligenciar Carga Académica Integral';
    this.isPrincipalFillCai = true;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

}
