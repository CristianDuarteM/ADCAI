import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent implements OnInit {

  backRouteFaculty: string;
  titleFaculty: string;
  isPrincipalFaculty: boolean;
  actionButtonFaculty: string;
  descriptionFormFaculty: string;

  constructor(private ngxPermissonsService: NgxPermissionsService) {
    this.backRouteFaculty = "/gestion-facultades";
    this.titleFaculty = 'Agregar Facultad';
    this.isPrincipalFaculty = false;
    this.actionButtonFaculty = 'Guardar';
    this.descriptionFormFaculty = 'Diligencie los campos requeridos para agregar una facultad';
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

}
