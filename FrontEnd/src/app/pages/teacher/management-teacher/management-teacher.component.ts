import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/models/Dialog';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { RolePermission } from 'src/app/models/RolePermission';
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

  constructor(private rolePermission: RolePermission, private navigation: Router, private facultyService: FacultyService,
    private departmentService: DepartmentService, public dialog: Dialog, private userService: UserService) {
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
    this.rolePermission.loadRole();

    this.teacher = new FormGroup({
      selectedFaculty: new FormControl('', [Validators.required]),
      selectedDepartment: new FormControl('', [Validators.required]),
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
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
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
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
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
            this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-docentes', error));
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-docentes', error));
      }
    });
  }

  selectDepartment(nameDepartment: string) {
    sessionStorage.setItem('nameDepartment', nameDepartment);
  }

  getItemValue(name: string) {
    return this.teacher.get(name)?.value;
  }

}
