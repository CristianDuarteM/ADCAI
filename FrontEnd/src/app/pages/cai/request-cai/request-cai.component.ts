import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    this.dataCai = {id: '001', semester: 'II', year: '2022', date: new Date(), teacher: {code: '123456', name: 'Pepito', lastName: 'Perez', email: 'pepitoperez@ufps.edu.co',
    hasCAI: true, role: ['DOCENTE'], faculty: '', department: 'Sistemas e informática', signature: ''}};
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
