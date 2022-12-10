import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { CaiModel } from 'src/app/models/CaiModel';

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

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteCai = '/gestion-cai';
    this.titleCai = 'Habilitar CAI';
    this.isPrincipalCai = false;
    this.dataCai = {} as CaiModel;
  }

  ngOnInit(): void {
    this.getDataCai();
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
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
