import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { CaiModel } from 'src/app/models/CaiModel';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css']
})
export class ViewTeacherComponent implements OnInit {

  backRouteViewTeacher: string;
  titleViewTeacher: string;
  isPrincipalViewTeacher: boolean;
  userModelViewTeacher: UserModel;
  isEditableViewTeacher: boolean;
  heightTableViewTeacher: { height: string };
  columnsToDisplayViewTeacher: string[];
  headerTableViewTeacher: string;
  buttonRouteViewTeacher: string;
  elementsDataViewTeacher: CaiModel[] = [
    {id: '001', semester: 'II', year: '2022', date: new Date(), teacher: {code: '123456', name: 'Pepito', lastName: 'Perez', email: 'pepitoperez@ufps.edu.co',
    hasCAI: true, role: ['DOCENTE'], faculty: '', department: 'Sistemas e informática', signature: ''}},
  ];

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteViewTeacher = '/gestion-docentes/buscados';
    this.titleViewTeacher = 'Visualizar Docente';
    this.isPrincipalViewTeacher = false;
    this.userModelViewTeacher = {
      name: 'Pepito', lastName: 'Perez', code: '123456', department: 'Sistemas e informática', faculty: '', email: 'pepitoperez@ufps.edu.co',
      hasCAI: true, role: ['DIRECTOR', 'DOCENTE'], signature: 'firma.png'
    };
    this.isEditableViewTeacher = false;
    this.heightTableViewTeacher = { height: '42vh' };
    this.headerTableViewTeacher = 'Listado de Cargas Académicas Integrales';
    this.buttonRouteViewTeacher = '/gestion-docentes/buscados/ver/cai';
    this.columnsToDisplayViewTeacher = ['Código','Nombre Completo', 'Id CAI', 'Año', 'Semestre', 'Acción'];
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
