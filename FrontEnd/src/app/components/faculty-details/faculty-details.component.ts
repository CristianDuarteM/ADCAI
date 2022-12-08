import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FacultyModel } from 'src/app/models/FacultyModel';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { UserService } from 'src/app/services/user/user.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';
import { FacultyRequest } from 'src/app/models/request/FacultyRequest';

@Component({
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrls: ['./faculty-details.component.css']
})
export class FacultyDetailsComponent implements OnInit {

  faculty: FormGroup;
  @Input() titleButton: string;
  @Input() descriptionForm: string;
  @Input() dataFaculty: FacultyModel;
  @Input() isUpdate: boolean;

  constructor(private facultyService: FacultyService, public dialog: MatDialog) {
    this.faculty = new FormGroup({});
    this.titleButton = '';
    this.descriptionForm = '';
    this.dataFaculty = { id: '', name: '', description: '', dean: ''};
    this.isUpdate = false;
  }

  ngOnInit(): void {
    this.faculty = new FormGroup({
      name: new FormControl(this.dataFaculty.name, [Validators.required]),
      description: new FormControl(this.dataFaculty.description, [Validators.required]),
      dean: new FormControl(this.dataFaculty.dean, [Validators.email]),
      doCai: new FormControl('')
    });
  }

  onSubmit() {
    if(this.faculty.valid){
      let doCai: boolean;
      if(this.faculty.get('doCai')?.value === ''){
        doCai = false;
      } else {
        doCai = this.faculty.get('doCai')?.value;
      }

      let facultyData: FacultyRequest = {
        nombre: this.faculty.get('name')?.value,
        descripcion: this.faculty.get('description')?.value,
        correoDecano: this.faculty.get('dean')?.value,
        realizaCai: doCai
      };

      if(this.isUpdate){
        console.log("Actualizar");
      } else{
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
        this.openDialog(error.error.msg, '/gestion-facultades');
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
