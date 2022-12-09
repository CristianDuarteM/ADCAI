import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  backRouteUpdateTeacher: string;
  titleUpdateTeacher: string;
  isPrincipalUpdateTeacher: boolean;
  userModelUpdateTeacher: User;
  isEditableUpdateTeacher: boolean;
  isLoaded: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router, private userService: UserService,
    public dialog: MatDialog, private route: ActivatedRoute) {
    this.backRouteUpdateTeacher = '/gestion-docentes/buscados';
    this.titleUpdateTeacher = 'Actualizar Docente';
    this.isPrincipalUpdateTeacher = false;
    this.userModelUpdateTeacher = {} as User;
    this.isEditableUpdateTeacher = true;
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getDataUser();
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  updateData(){
    this.navigation.navigate(['/gestion-docentes']);
  }

  getDataUser() {
    let idTeacher = this.route.snapshot.paramMap.get('idTeacher');
    this.userService.getUserById(idTeacher +'').subscribe({
      next: userResponse => {
        this.userModelUpdateTeacher = userResponse.usuario;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        let route = '/gestion-docentes';
        if(error.status === 401) {
          sessionStorage.clear();
          route = '/login';
        }
        this.openDialog(error.error.msg, route);
      }
    });
  }

  openDialog(description: string, routeRedirect: string) {
    this.dialog.open(InformativeDialogComponent, {
      data: {
        description,
        routeRedirect
      },
      disableClose: true
    });
  }

}
