import { Component, OnInit } from '@angular/core';
import { CaiModel } from 'src/app/models/CaiModel';
import { RolePermission } from 'src/app/models/RolePermission';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css']
})
export class ViewTeacherComponent implements OnInit {

  backRouteViewTeacher: string;
  titleViewTeacher: string;
  isPrincipalViewTeacher: boolean;
  isEditableViewTeacher: boolean;
  heightTableViewTeacher: { height: string };
  columnsToDisplayViewTeacher: string[];
  headerTableViewTeacher: string;
  buttonRouteViewTeacher: string;
  elementsDataViewTeacher: CaiModel[] = [];

  constructor(private rolePermission: RolePermission) {
    this.backRouteViewTeacher = '/gestion-docentes';
    this.titleViewTeacher = 'Visualizar Docente';
    this.isPrincipalViewTeacher = false;
    this.isEditableViewTeacher = false;
    this.heightTableViewTeacher = { height: '42vh' };
    this.headerTableViewTeacher = 'Listado de Cargas Académicas Integrales';
    this.buttonRouteViewTeacher = '/gestion-docentes/buscados/ver/cai';
    this.columnsToDisplayViewTeacher = ['Código','Nombre Completo', 'Id CAI', 'Año', 'Semestre', 'Acción'];
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

}
