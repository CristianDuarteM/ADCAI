import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';
import { FacultyRequest } from 'src/app/models/request/FacultyRequest';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';

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

  constructor(private facultyService: FacultyService, public dialog: MatDialog) {
    this.faculty = new FormGroup({});
    this.titleButton = '';
    this.descriptionForm = '';
    this.dataFaculty = {
      id: 0, nombre: '', descripcion: '', estado: false, decano: { id: 0, nombre: '', apellido: '', correo: '', realizaCai: true }
    };
    this.isUpdate = false;
  }

  ngOnInit(): void {
    this.faculty = new FormGroup({
      name: new FormControl(this.dataFaculty.nombre, [Validators.required]),
      description: new FormControl(this.dataFaculty.descripcion, [Validators.required]),
      dean: new FormControl((this.dataFaculty.decano !== null) ? this.dataFaculty.decano.correo : '', [Validators.email, Validators.required]),
      doCai: new FormControl((this.dataFaculty.decano !== null) ? this.dataFaculty.decano.realizaCai + '' : false + '')
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
        this.openDialog(facultyResponse.msg, '/gestion-facultades');
      },
      error: (error: HttpErrorResponse) => {
        let route = '/gestion-facultades/agregar';
        if(error.status === 401) {
          route = '/login';
        }
        this.openDialog(error.error.msg, route);
      }
    });
  }

  updateFaculty(facultyData: {}) {
    this.facultyService.updateFaculty(facultyData, this.dataFaculty.id + '').subscribe({
      next: facultyResponse => {
        this.openDialog(facultyResponse.msg, '/gestion-facultades');
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = error.error.msg;
        if(errorMessage === undefined){
          errorMessage = "¡Ha ocurrido un error!";
        }
        this.openDialog(errorMessage, '/gestion-facultades/editar/' + this.dataFaculty.id);
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
