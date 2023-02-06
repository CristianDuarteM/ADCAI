import { Component, OnInit } from '@angular/core';
import { CaiModel } from 'src/app/models/CaiModel';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-request-cai',
  templateUrl: './request-cai.component.html',
  styleUrls: ['./request-cai.component.css']
})
export class RequestCaiComponent implements OnInit {

  backRouteCai: string;
  titleCai: string;
  isPrincipalCai: boolean;
  dataCai: CaiModel;

  constructor(private rolePermission: RolePermission) {
    this.backRouteCai = '/gestion-cai';
    this.titleCai = 'Habilitar CAI';
    this.isPrincipalCai = false;
    this.dataCai = {} as CaiModel;
  }

  ngOnInit(): void {
    this.getDataCai();
    this.rolePermission.loadRole();
  }

  getDataCai() {
    let date = new Date();
    this.dataCai.anno = date.getFullYear() +'';
    this.dataCai.semestre = 'II';
    if(date.getMonth() <= 5) {
      this.dataCai.semestre = 'I';
    }
  }

}
