import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  backRouteUpdateTeacher: string;
  titleUpdateTeacher: string;
  isPrincipalUpdateTeacher: boolean;
  userModelUpdateTeacher: UserModel;
  isEditableUpdateTeacher: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteUpdateTeacher = '/gestion-docentes/buscados';
    this.titleUpdateTeacher = 'Actualizar Docente';
    this.isPrincipalUpdateTeacher = false;
    this.userModelUpdateTeacher = {
      name: 'Pepito', lastName: 'Perez', code: '123456', department: '1', faculty: '', email: 'pepitoperez@ufps.edu.co',
      hasCAI: true, role: ['DIRECTOR', 'DOCENTE'], signature: 'firma.png'
    };
    this.isEditableUpdateTeacher = true;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  updateData(){
    this.navigation.navigate(['/gestion-docentes']);
  }

}
