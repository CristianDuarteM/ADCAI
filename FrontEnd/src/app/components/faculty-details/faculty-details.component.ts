import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { FacultyRequest } from 'src/app/models/request/FacultyRequest';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { Dialog } from 'src/app/models/Dialog';

@Component({
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrls: ['./faculty-details.component.css']
})
export class FacultyDetailsComponent implements OnInit {

  faculty: FormGroup;
  @Input() titleButton: string;
  @Input() descriptionForm: string;
  @Input() dataFaculty: FacultyResponse;
  @Input() isUpdate: boolean;

  constructor(private facultyService: FacultyService, private dialog: Dialog) {
    this.faculty = new FormGroup({});
    this.titleButton = '';
    this.descriptionForm = '';
    this.dataFaculty = new FacultyResponse();
    this.isUpdate = false;
  }

  ngOnInit(): void {
    this.faculty = new FormGroup({
      name: new FormControl(this.dataFaculty.nombre, [Validators.required]),
      description: new FormControl(this.dataFaculty.descripcion, [Validators.required]),
      dean: new FormControl((this.dataFaculty.decano !== null) ? this.dataFaculty.decano.correo : '', [Validators.email, Validators.required]),
      doCai: new FormControl(((this.dataFaculty.decano !== null) ? this.dataFaculty.decano.realizaCai : true) + '')
    });
  }

  onSubmit() {
    if(this.faculty.valid){
      let doCai: boolean;
      if(this.faculty.get('doCai')?.value === ''){
        doCai = false;
      } else {
        doCai = (this.getValueInput('doCai') === 'false') ? false : true;
      }

      if(this.isUpdate){
        this.updateFaculty(this.validateData(doCai));
      } else{
        let facultyData: FacultyRequest = {
          nombre: this.faculty.get('name')?.value,
          descripcion: this.faculty.get('description')?.value,
          correoDecano: this.faculty.get('dean')?.value,
          realizaCai: doCai
        };
        this.addFaculty(facultyData);
      }
    }
  }

  addFaculty(facultyData: FacultyRequest) {
    this.facultyService.addFaculty(facultyData).subscribe({
      next: facultyResponse => {
        this.dialog.openDialog(facultyResponse.msg, '/gestion-facultades');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(error.error.msg, this.dialog.validateError('/gestion-facultades/agregar', error));
      }
    });
  }

  updateFaculty(facultyData: {}) {
    this.facultyService.updateFaculty(facultyData, this.dataFaculty.id + '').subscribe({
      next: facultyResponse => {
        this.dialog.openDialog(facultyResponse.msg, '/gestion-facultades');
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = error.error.msg;
        if(errorMessage === undefined){
          errorMessage = "¡Ha ocurrido un error!";
        }
        this.dialog.openDialog(errorMessage, '/gestion-facultades/editar/' + this.dataFaculty.id);
      }
    });
  }

  validateData(doCai: boolean): {} {
    type dataValidate = {
      [key: string]: any,
    };

    let facultyDataValidate: dataValidate = {};

    if(this.dataFaculty.nombre !== this.getValueInput('name')) {
      facultyDataValidate['nombre'] = this.getValueInput('name');
    }
    if(this.dataFaculty.descripcion !== this.getValueInput('description')) {
      facultyDataValidate['descripcion'] = this.getValueInput('description');
    }
    if((this.dataFaculty.decano === null) || this.dataFaculty.decano.realizaCai !== doCai){
      facultyDataValidate['correoDecano'] = this.getValueInput('dean');
      facultyDataValidate['realizaCai'] = doCai;
    }
    if((this.dataFaculty.decano === null) || this.dataFaculty.decano.correo !== this.getValueInput('dean')){
      facultyDataValidate['correoDecano'] = this.getValueInput('dean');
    }

    return facultyDataValidate;
  }

  getValueInput(name: string) {
    return this.faculty.get(name)?.value;
  }

}
