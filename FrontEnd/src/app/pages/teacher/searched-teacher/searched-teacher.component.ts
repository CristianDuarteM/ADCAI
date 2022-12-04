import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-searched-teacher',
  templateUrl: './searched-teacher.component.html',
  styleUrls: ['./searched-teacher.component.css']
})
export class SearchedTeacherComponent implements OnInit {

  backRouteTeacher: string;
  titleTeacher: string;
  isPrincipalTeacher: boolean;
  columnsToDisplayTeacher: string[];
  headerTableTeacher: string;
  updateRouteTeacher: string;
  descriptionDisableTeacher: string;
  elementsDataTeacher: UserModel[] = [
    {code: '0', name: 'Pepito', lastName: 'Perez', email: 'pepitoperez@ufps.edu.co',
    hasCAI: true, role: ['DOCENTE'], department: 'Sistemas e informática', signature: '' },
  ];

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteTeacher = '/gestion-docentes';
    this.titleTeacher = 'Docentes Buscados';
    this.isPrincipalTeacher = false;
    this.headerTableTeacher = 'Listado de Docentes';
    this.updateRouteTeacher = '/gestion-docentes/editar';
    this.columnsToDisplayTeacher = ['Código','Nombre Completo', 'Correo', '¿Realiza CAI?', 'Acción'];
    this.descriptionDisableTeacher = '¿Está seguro de deshabilitar el docente seleccionado?';
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  newSearch() {
    this.navigation.navigate(['/gestion-docentes']);
  }

}
