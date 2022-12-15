import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentRequest } from 'src/app/models/request/DepartmentRequest';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  department: FormGroup;
  @Input() titleButton: string;
  @Input() descriptionForm: string;
  @Input() dataDepartment: DepartmentResponse;
  @Input() isUpdate: boolean;
  @Input() facultyList: FacultyResponse[];
  isLoaded: boolean;

  constructor(private facultyService: FacultyService, public dialog: MatDialog,
    private departmentService: DepartmentService) {
    this.department = new FormGroup({});
    this.titleButton = '';
    this.descriptionForm = '';
    this.dataDepartment = {} as DepartmentResponse;
    this.facultyList = [];
    this.isUpdate = false;
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getFacultyList();
    this.department = new FormGroup({
      name: new FormControl(this.dataDepartment.nombre, [Validators.required]),
      description: new FormControl(this.dataDepartment.descripcion, [Validators.required]),
      director: new FormControl((this.dataDepartment.director !== undefined) ? this.dataDepartment.director.correo : '', [Validators.email, Validators.required]),
      faculty: new FormControl((this.dataDepartment.facultad !== undefined) ? this.dataDepartment.facultad.id : '', [Validators.required, Validators.pattern('^[1-9]*')]),
      doCai: new FormControl((this.dataDepartment.director !== undefined) ? this.dataDepartment.director.realizaCai + '' : true + '')
    });
  }

  onSubmit() {
    if(this.department.valid) {
      let doCai: boolean;
      if(this.getValueInput('doCai') === ''){
        doCai = false;
      } else {
        doCai = (this.getValueInput('doCai') === 'false') ? false : true;
      }

      if(this.isUpdate){
        this.updateDepartment(this.validateData(doCai));
      } else {
        let departmentData: DepartmentRequest = {
          nombre: this.getValueInput('name'),
          descripcion: this.getValueInput('description'),
          id_facultad: this.getValueInput('faculty'),
          correoDirector: this.getValueInput('director'),
          realizaCai: doCai
        }
        this.addDepartment(departmentData);
      }
    }
  }

  addDepartment(departmentData: DepartmentRequest) {
    this.departmentService.addDepartment(departmentData).subscribe({
      next: departmentResponse => {
        this.openDialog(departmentResponse.msg, '/gestion-departamentos');
      },
      error: (error: HttpErrorResponse) => {
        let route = '/gestion-departamentos/agregar';
        if(error.status === 401) {
          route = '/login';
        }
        this.openDialog(error.error.msg, route);
      }
    });
  }

  updateDepartment(departmentData: {}) {
    this.departmentService.updateDepartment(departmentData, this.dataDepartment.id + '').subscribe({
      next: departmentResponse => {
        this.openDialog(departmentResponse.msg, '/gestion-departamentos');
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = error.error.msg;
        if(errorMessage === undefined){
          errorMessage = "¡Ha ocurrido un error!";
        }
        this.openDialog(errorMessage, '/gestion-departamentos/editar/' + this.dataDepartment.id);
      }
    });
  }

  validateData(doCai: boolean): {} {
    type dataValidate = {
      [key: string]: any,
    };

    let departmentDataValidate: dataValidate = {};

    if(this.dataDepartment.nombre !== this.getValueInput('name')) {
      departmentDataValidate['nombre'] = this.getValueInput('name');
    }
    if(this.dataDepartment.descripcion !== this.getValueInput('description')) {
      departmentDataValidate['descripcion'] = this.getValueInput('description');
    }
    if((this.dataDepartment.facultad === null) || this.dataDepartment.facultad.id !== this.getValueInput('faculty')){
      departmentDataValidate['id_facultad'] = this.getValueInput('faculty');
    }
    if((this.dataDepartment.director === null) || this.dataDepartment.director.realizaCai !== doCai){
      departmentDataValidate['correoDirector'] = this.getValueInput('director');
      departmentDataValidate['realizaCai'] = doCai;
    }
    if((this.dataDepartment.director === null) || this.dataDepartment.director.correo !== this.getValueInput('director')){
      departmentDataValidate['correoDirector'] = this.getValueInput('director');
    }

    return departmentDataValidate;
  }

  getFacultyList() {
    this.facultyService.getFacultyList().subscribe({
      next: facultyListResponse => {
        this.facultyList = facultyListResponse.rows;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, '/login');
      }
    });
  }

  getValueInput(name: string) {
    return this.department.get(name)?.value;
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
