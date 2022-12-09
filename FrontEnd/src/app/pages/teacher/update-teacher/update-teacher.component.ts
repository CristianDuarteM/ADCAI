import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  backRouteUpdateTeacher: string;
  titleUpdateTeacher: string;
  isPrincipalUpdateTeacher: boolean;
  isEditableUpdateTeacher: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router) {
    this.backRouteUpdateTeacher = '/gestion-docentes';
    this.titleUpdateTeacher = 'Actualizar Docente';
    this.isPrincipalUpdateTeacher = false;
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
