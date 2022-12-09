import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { config } from 'src/app/constants/config';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-management-teacher',
  templateUrl: './management-teacher.component.html',
  styleUrls: ['./management-teacher.component.css']
})
export class ManagementTeacherComponent implements OnInit {

  backRouteTeacher: string;
  titleTeacher: string;
  isPrincipalTeacher: boolean;
  teacher: FormGroup;
  facultyList: FacultyResponse[];
  departmentList: DepartmentResponse[];
  facultyControl: FormControl;
  departmentControl: FormControl;
  actionButton: string;
  isDirector: boolean;
  idFaculty: number;
  idDepartment: number;

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router,
    private facultyService: FacultyService, private departmentService: DepartmentService,
    public dialog: MatDialog, private userService: UserService) {
    this.backRouteTeacher = '/home';
    this.titleTeacher = 'Gestionar Docentes';
    this.isPrincipalTeacher = true;
    this.teacher = new FormGroup({});
    this.facultyList = [];
    this.departmentList = [];
    this.facultyControl = new FormControl(this.facultyList[0]);
    this.departmentControl = new FormControl(this.departmentList[0]);
    this.actionButton = 'BUSCAR';
    this.isDirector = false;
    this.idFaculty = 0;
    this.idDepartment = 0;
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);

    this.teacher = new FormGroup({
      selectedFaculty: new FormControl('', [Validators.required, Validators.pattern('^[1-9]*')]),
      selectedDepartment: new FormControl('', [Validators.required, Validators.pattern('^[1-9]*')]),
      filterSelect: new FormControl(''),
      filterText: new FormControl(''),
    });

    if(activeRole === 'DIRECTOR'){
      this.isDirector = true;
      this.getDataDirector();
    } else {
      this.getFacultyList();
    }
  }

  onSubmitSearch() {
    if(this.teacher.valid) {
      sessionStorage.setItem('typeFilter', this.getItemValue('filterSelect'));
      sessionStorage.setItem('filter',this.getItemValue('filterText'));
      this.navigation.navigate(['/gestion-docentes/buscados/facultad/' + this.idFaculty + '/departamento/' +
      this.idDepartment]);
    }
  }

  addTeacher() {
    if(this.teacher.valid) {
      this.navigation.navigate(['/gestion-docentes/agregar/facultad/' + this.idFaculty + '/departamento/' +
      this.idDepartment]);
    }
  }

  onSubmit() {
    if(sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE) === 'ADMIN') {
      this.idFaculty = this.getItemValue('selectedFaculty');
      this.idDepartment = this.getItemValue('selectedDepartment');
    }
    if(this.actionButton === 'AGREGAR') {
      this.addTeacher();
    } else{
      this.onSubmitSearch();
    }
  }

  addButton() {
    this.actionButton = 'AGREGAR';
  }

  getFacultyList() {
    this.facultyService.getFacultyList().subscribe({
      next: facultyListResponse => {
        this.facultyList = facultyListResponse.rows;
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, '/login');
      }
    });
  }

  getDepartmentList(idFaculty: string, nameFaculty: string) {
    sessionStorage.setItem('nameFaculty', nameFaculty);
    this.departmentService.getDepartmentListByFaculty(idFaculty).subscribe({
      next: departmentListResponse => {
        this.departmentList =  departmentListResponse;
      },
      error: (error: HttpErrorResponse) => {
        sessionStorage.clear();
        this.openDialog(error.error.msg, '/login');
      }
    });
  }

  getDataDirector() {
    this.userService.getUserById(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '').subscribe({
      next: userResponse => {
        this.departmentService.getDepartmentById(userResponse.usuario.id_departamento + '').subscribe({
          next: departmentResponse => {
            sessionStorage.setItem('nameFaculty', departmentResponse.facultad.nombre);
            sessionStorage.setItem('nameDepartment', departmentResponse.nombre);
            this.idFaculty = departmentResponse.id;
            this.idDepartment = departmentResponse.facultad.id;
            this.teacher.setControl('selectedFaculty', new FormControl({value: departmentResponse.facultad.nombre, disabled: true}));
            this.teacher.setControl('selectedDepartment', new FormControl({value: departmentResponse.nombre, disabled: true}));
          },
          error: (error: HttpErrorResponse) => {
            this.openDialog(error.error.msg, this.validationRedirect(error));
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error));
      }
    });
  }

  validationRedirect(error: HttpErrorResponse) {
    let route = '/gestion-docentes';
    if(error.status === 401) {
      sessionStorage.clear();
      route = '/login';
    }
    return route;
  }

  selectDepartment(nameDepartment: string) {
    sessionStorage.setItem('nameDepartment', nameDepartment);
  }

  getItemValue(name: string) {
    return this.teacher.get(name)?.value;
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
