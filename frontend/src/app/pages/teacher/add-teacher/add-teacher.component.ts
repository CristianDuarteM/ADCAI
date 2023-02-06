import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermission } from 'src/app/services/RolePermission';

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

  constructor(private rolePermission: RolePermission, private navigation: Router, private route: ActivatedRoute) {
    this.backRouteTeacher = '/gestion-docentes';
    this.titleTeacher = 'Agregar Docentes';
    this.isPrincipalTeacher = false;
    this.teacher = new FormGroup({
      selectedFaculty: new FormControl({value: sessionStorage.getItem('nameFaculty'), disabled: true}),
      selectedDepartment: new FormControl({value: sessionStorage.getItem('nameDepartment'), disabled: true}),
    });
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

  massiveLoad(){
    let idFaculty = this.route.snapshot.paramMap.get('idFaculty');
    let idDepartment = this.route.snapshot.paramMap.get('idDepartment');
    this.navigation.navigate(['/gestion-docentes/agregar/masivo/facultad/' + idFaculty  + '/departamento/' + idDepartment]);
  }

  manualLoad(){
    let idFaculty = this.route.snapshot.paramMap.get('idFaculty');
    let idDepartment = this.route.snapshot.paramMap.get('idDepartment');
    this.navigation.navigate(['/gestion-docentes/agregar/manual/facultad/' + idFaculty + '/departamento/' + idDepartment]);
  }

}
