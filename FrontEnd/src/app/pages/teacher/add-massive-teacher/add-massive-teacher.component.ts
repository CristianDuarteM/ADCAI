import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-add-massive-teacher',
  templateUrl: './add-massive-teacher.component.html',
  styleUrls: ['./add-massive-teacher.component.css']
})
export class AddMassiveTeacherComponent implements OnInit {

  backRouteTeacher: string;
  titleTeacher: string;
  isPrincipalTeacher: boolean;
  teacher: FormGroup;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteTeacher = '/gestion-docentes/agregar';
    this.titleTeacher = 'Agregar Docentes - Masivo';
    this.isPrincipalTeacher = false;
    this.teacher = new FormGroup({
      selectedFaculty: new FormControl({value: 'Facultad seleccionada', disabled: true}),
      selectedDepartment: new FormControl({value: 'Departamento seleccionado', disabled: true}),
      selectedFile: new FormControl('')
    });
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  addMassiveTeacher() {
    this.navigation.navigate(['/gestion-docentes']);
  }

}
