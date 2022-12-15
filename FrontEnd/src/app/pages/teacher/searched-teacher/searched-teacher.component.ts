import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { UserResponse } from 'src/app/models/response/userResponse';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-searched-teacher',
  templateUrl: './searched-teacher.component.html',
  styleUrls: ['./searched-teacher.component.css']
})
export class SearchedTeacherComponent implements OnInit {

  backRouteTeacher: string;
  titleTeacher: string;
  isPrincipalTeacher: boolean;
  heightTableSearchedTeacher: { height: string };
  columnsToDisplayTeacher: string[];
  headerTableTeacher: string;
  buttonRouteTeacher: string;
  descriptionDisableTeacher: string;
  elementsDataTeacher: UserResponse[];
  typeFilter: string;
  filter: string;
  isLoaded: boolean;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router,
    private userService: UserService, public dialog: MatDialog, private route: ActivatedRoute) {
    this.backRouteTeacher = '/gestion-docentes';
    this.titleTeacher = 'Docentes Buscados';
    this.isPrincipalTeacher = false;
    this.heightTableSearchedTeacher = { height: '42vh' };
    this.headerTableTeacher = 'Listado de Docentes';
    this.buttonRouteTeacher = '';
    this.columnsToDisplayTeacher = ['Código','Nombre Completo', 'Correo', '¿Realiza CAI?', 'Acción'];
    this.descriptionDisableTeacher = 'el docente seleccionado';
    this.elementsDataTeacher = [];
    this.typeFilter = this.getTypeFilter() || '';
    this.filter = this.getFilter() || '';
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.searchTeacherList();
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
    this.buttonRouteTeacher = (activeRole === 'ADMIN') ? '/gestion-docentes/buscados/editar' : '/gestion-docentes/buscados/ver';
  }

  newSearch() {
    this.navigation.navigate(['/gestion-docentes']);
  }

  searchTeacherList() {
    let idDepartment = this.route.snapshot.paramMap.get('idDepartment') || '';
    this.userService.getUserFilter(idDepartment, this.typeFilter, this.filter).subscribe({
      next: userResponse => {
        this.elementsDataTeacher = userResponse.rows;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        sessionStorage.clear();
        this.openDialog(error.error.msg, '/login');
      }
    });
  }

  getNameFaculty() {
    return sessionStorage.getItem('nameFaculty');
  }

  getNameDepartment() {
    return sessionStorage.getItem('nameDepartment');
  }

  getTypeFilter() {
    return sessionStorage.getItem('typeFilter');
  }

  getFilter() {
    return sessionStorage.getItem('filter');
  }

  clearSessionStorage() {
    sessionStorage.removeItem('nameFaculty');
    sessionStorage.removeItem('nameDepartment');
    sessionStorage.removeItem('typeFilter');
    sessionStorage.removeItem('filter');
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
