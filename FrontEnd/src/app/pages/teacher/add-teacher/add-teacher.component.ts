import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router,
    private route: ActivatedRoute) {
    this.backRouteTeacher = '/gestion-docentes';
    this.titleTeacher = 'Agregar Docentes';
    this.isPrincipalTeacher = false;
    this.teacher = new FormGroup({
      selectedFaculty: new FormControl({value: sessionStorage.getItem('nameFaculty'), disabled: true}),
      selectedDepartment: new FormControl({value: sessionStorage.getItem('nameDepartment'), disabled: true}),
    });
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  massiveLoad(){
    let idDepartment = this.route.snapshot.paramMap.get('idDepartment');
    this.navigation.navigate(['/gestion-docentes/agregar/masivo/departamento/' + idDepartment]);
  }

  manualLoad(){
    let idDepartment = this.route.snapshot.paramMap.get('idDepartment');
    this.navigation.navigate(['/gestion-docentes/agregar/manual/departamento/' + idDepartment]);
  }

}
