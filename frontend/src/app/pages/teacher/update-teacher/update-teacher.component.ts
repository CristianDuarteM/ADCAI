import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolePermission } from 'src/app/services/RolePermission';

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

  constructor(private rolePermission: RolePermission, private navigation: Router) {
    this.backRouteUpdateTeacher = '/gestion-docentes';
    this.titleUpdateTeacher = 'Actualizar Docente';
    this.isPrincipalUpdateTeacher = false;
    this.isEditableUpdateTeacher = true;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

  updateData(){
    this.navigation.navigate(['/gestion-docentes']);
  }

}
