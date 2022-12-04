import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-add-manual-teacher',
  templateUrl: './add-manual-teacher.component.html',
  styleUrls: ['./add-manual-teacher.component.css']
})
export class AddManualTeacherComponent implements OnInit {

  backRouteTeacher: string;
  titleTeacher: string;
  isPrincipalTeacher: boolean;
  teacher: FormGroup;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteTeacher = '/gestion-docentes/agregar';
    this.titleTeacher = 'Agregar Docentes - Manual';
    this.isPrincipalTeacher = false;
    this.teacher = new FormGroup({
      selectedFaculty: new FormControl({value: 'Facultad seleccionada', disabled: true}),
      selectedDepartment: new FormControl({value: 'Departamento seleccionado', disabled: true}),
      email: new FormControl('')
    });
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  addManualTeacher() {
    this.navigation.navigate(['/gestion-docentes']);
  }

}
