import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { CaiModel } from 'src/app/models/CaiModel';

@Component({
  selector: 'app-update-request-cai',
  templateUrl: './update-request-cai.component.html',
  styleUrls: ['./update-request-cai.component.css']
})
export class UpdateRequestCaiComponent implements OnInit {

  backRouteCai: string;
  titleCai: string;
  isPrincipalCai: boolean;
  dataCai: CaiModel;

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteCai = '/gestion-cai';
    this.titleCai = 'Actualizar CAI';
    this.isPrincipalCai = false;
    this.dataCai = {id: '001', semester: 'II', year: '2022', date: new Date('10/10/2022'), teacher: {code: '123456', name: 'Pepito', lastName: 'Perez', email: 'pepitoperez@ufps.edu.co',
    hasCAI: true, role: ['DOCENTE'], faculty: '', department: 'Sistemas e informática', signature: ''}};
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
