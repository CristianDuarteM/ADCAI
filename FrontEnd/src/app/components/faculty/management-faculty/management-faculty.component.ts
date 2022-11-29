import { Component, OnInit } from '@angular/core';
import { FacultyModel } from '../../../models/FacultyModel';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-management-faculty',
  templateUrl: './management-faculty.component.html',
  styleUrls: ['./management-faculty.component.css']
})
export class ManagementFacultyComponent implements OnInit {

  backRouteFaculty: string;
  titleFaculty: string;
  isPrincipalFaculty: boolean;
  columnsToDisplayFaculty: string[];
  headerTableFaculty: string;
  updateRouteFaculty: string;
  disableRouteFaculty: string;
  elementsDataFaculty: FacultyModel[] = [
    {id: '1', name: 'Ingeniería', description: 'La Facultad de Ingeniería responde al reto y la necesidad ' +
    'de formar profesionales que asuman la responsabilidad de generar procesos...', dean: 'Decano Pepito Perez'},
  ];;

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteFaculty = '/home';
    this.titleFaculty = 'Gestión de Facultades';
    this.isPrincipalFaculty = true;
    this.headerTableFaculty = 'Listado de Facultades';
    this.updateRouteFaculty = '/gestion-facultades/editar';
    this.disableRouteFaculty = '';
    this.columnsToDisplayFaculty = ['Id','Nombre', 'Descripción', 'Decano', 'Acción'];
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
