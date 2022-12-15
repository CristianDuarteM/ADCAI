import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from 'src/app/models/Dialog';
import { DepartmentRequest } from 'src/app/models/request/DepartmentRequest';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';

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

  constructor(private facultyService: FacultyService, public dialog: Dialog,
    private departmentService: DepartmentService) {
    this.department = new FormGroup({});
    this.titleButton = '';
    this.descriptionForm = '';
    this.dataDepartment = new DepartmentResponse();
    this.facultyList = [];
    this.isUpdate = false;
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getFacultyList();
    this.department = new FormGroup({
      name: new FormControl(this.dataDepartment.nombre, [Validators.required]),
      description: new FormControl(this.dataDepartment.descripcion, [Validators.required]),
      director: new FormControl( this.dataDepartment.director.correo, [Validators.email, Validators.required]),
      faculty: new FormControl((this.dataDepartment.facultad.id === 0) ? '' : this.dataDepartment.facultad.id, [Validators.required]),
      doCai: new FormControl(this.dataDepartment.director.realizaCai + '')
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
        this.dialog.openDialog(departmentResponse.msg, '/gestion-departamentos');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(error.error.msg, this.dialog.validateError('/gestion-departamentos/agregar', error));
      }
    });
  }

  updateDepartment(departmentData: {}) {
    this.departmentService.updateDepartment(departmentData, this.dataDepartment.id + '').subscribe({
      next: departmentResponse => {
        this.dialog.openDialog(departmentResponse.msg, '/gestion-departamentos');
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = error.error.msg;
        if(errorMessage === undefined){
          errorMessage = "¡Ha ocurrido un error!";
        }
        this.dialog.openDialog(errorMessage, '/gestion-departamentos/editar/' + this.dataDepartment.id);
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
        this.dialog.openDialog(error.error.msg, '/login');
      }
    });
  }

  getValueInput(name: string) {
    return this.department.get(name)?.value;
  }

}
