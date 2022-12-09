import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';

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

  constructor(private ngxPermissonsService: NgxPermissionsService, private navigation: Router,
    private facultyService: FacultyService, private departmentService: DepartmentService,
    public dialog: MatDialog) {
    this.backRouteTeacher = '/home';
    this.titleTeacher = 'Gestionar Docentes';
    this.isPrincipalTeacher = true;
    this.teacher = new FormGroup({});
    this.facultyList = [];
    this.departmentList = [];
    this.facultyControl = new FormControl(this.facultyList[0]);
    this.departmentControl = new FormControl(this.departmentList[0]);
  }

  ngOnInit(): void {
    this.getFacultyList();
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);

    this.teacher = new FormGroup({
      facultySelect: new FormControl('', [Validators.required, Validators.pattern('^[1-9]*')]),
      departmentSelect: new FormControl('', [Validators.required, Validators.pattern('^[1-9]*')]),
      filterSelect: new FormControl(''),
      filterText: new FormControl(''),
    });
    if(activeRole === 'DIRECTOR'){
      //Consulta al servicio por la facultad y departamento
      let idFaculty = '2';
      let idDepartment = '2';
      this.teacher.setControl('facultySelect', new FormControl({value: idFaculty, disabled: true}, [Validators.required, Validators.pattern('^[1-9]*')]));
      this.teacher.setControl('departmentSelect', new FormControl({value: idDepartment, disabled: true}, [Validators.required, Validators.pattern('^[1-9]*')]));
    }
  }

  onSubmitSearch() {
    if(this.teacher.valid) {
      sessionStorage.setItem('typeFilter', this.teacher.get('filterSelect')?.value);
      sessionStorage.setItem('filter', this.teacher.get('filterText')?.value);
      this.navigation.navigate(['/gestion-docentes/buscados/facultad/' + this.teacher.get('facultySelect')?.value + '/departamento/' +
      this.teacher.get('departmentSelect')?.value]);
    }
  }

  addTeacher() {
    this.navigation.navigate(['/gestion-docentes/agregar']);
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

  selectDepartment(nameDepartment: string) {
    sessionStorage.setItem('nameDepartment', nameDepartment);
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
