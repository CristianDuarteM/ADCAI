import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { FacultyModel } from 'src/app/models/FacultyModel';

@Component({
  selector: 'app-update-faculty',
  templateUrl: './update-faculty.component.html',
  styleUrls: ['./update-faculty.component.css']
})
export class UpdateFacultyComponent implements OnInit {

  backRouteFaculty: string;
  titleFaculty: string;
  isPrincipalFaculty: boolean;
  actionButtonFaculty: string;
  descriptionFormFaculty: string;
  dataFaculty: FacultyModel;

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteFaculty = "/gestion-facultades";
    this.titleFaculty = 'Detalles de la Facultad';
    this.isPrincipalFaculty = false;
    this.actionButtonFaculty = 'Actualizar';
    this.descriptionFormFaculty = 'Actualice los campos que desea modificar de la facultad';
    this.dataFaculty = {
      id: '1', name: 'Ingeniería 2', description: 'La Facultad de Ingeniería 2 responde al reto y la necesidad ' +
      'de formar profesionales que asuman la responsabilidad de generar procesos...', dean: 'Decano Pepita Perez'
    };
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
