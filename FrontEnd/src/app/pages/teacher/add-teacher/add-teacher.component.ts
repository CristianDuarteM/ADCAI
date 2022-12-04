import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  backRouteTeacher: string;
  titleTeacher: string;
  isPrincipalTeacher: boolean;
  teacher: FormGroup;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteTeacher = '/gestion-docentes';
    this.titleTeacher = 'Agregar Docentes';
    this.isPrincipalTeacher = false;
    this.teacher = new FormGroup({
      selectedFaculty: new FormControl({value: 'Facultad seleccionada', disabled: true}),
      selectedDepartment: new FormControl({value: 'Departamento seleccionado', disabled: true}),
    });
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  massiveLoad(){
    this.navigation.navigate(['/gestion-docentes/agregar/masivo']);
  }

  manualLoad(){
    this.navigation.navigate(['/gestion-docentes/agregar/manual']);
  }

}
