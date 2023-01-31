import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dialog } from 'src/app/models/Dialog';
import { SubjectResponse } from 'src/app/models/response/subjectResponse';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  subjectForm: FormGroup;
  subject: SubjectResponse;
  @Input() idSubject: string;
  @Input() isUpdate: boolean;
  isLoaded: boolean;

  constructor(public dialog: Dialog, private subjectService: SubjectService) {
    this.subjectForm = new FormGroup({});
    this.idSubject = '';
    this.subject = new SubjectResponse();
    this.isUpdate = false;
    this.isLoaded = false;
  }

  ngOnInit(): void {
    let isDisabled = (this.isUpdate) ? false : true;

    this.subjectForm = new FormGroup({
      nameInput: new FormControl({value: '', disabled: isDisabled}),
      creditsInput: new FormControl({value: '', disabled: isDisabled}),
      theoreticalHoursInput: new FormControl({value: '', disabled: isDisabled}),
      practicalHoursInput: new FormControl({value: '', disabled: isDisabled}),
      stateForm: new FormControl({value: '', disabled: isDisabled}),
    });
    this.getSujectById();
  }

  getSujectById() {
    this.subjectService.getSubjectById(this.idSubject).subscribe({
      next: subjectResponse => {
        this.subjectForm.setValue({
          nameInput: subjectResponse.nombre,
          creditsInput: subjectResponse.creditos,
          theoreticalHoursInput: subjectResponse.horas_teoricas,
          practicalHoursInput: subjectResponse.horas_practicas,
          stateForm: subjectResponse.estado + ''
        });
        this.subject = subjectResponse;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-plan-estudio/', error));
      }
    });
  }

  onSubmit() {
    this.subjectService.updateSubject(this.idSubject, this.formatDataSubject()).subscribe({
      next: subjectUpdateResponse => {
        this.dialog.openDialog(subjectUpdateResponse.msg, '/gestion-plan-estudio/');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-plan-estudio/', error));
      }
    });
  }

  formatDataSubject() {
    let subjectData = {
      nombre: this.subjectForm.get('nameInput')?.value,
      creditos: this.subjectForm.get('creditsInput')?.value,
      horas_teoricas: this.subjectForm.get('theoreticalHoursInput')?.value,
      horas_practicas: this.subjectForm.get('practicalHoursInput')?.value,
      estado: (this.subjectForm.get('stateForm')?.value === 'true') ? true : false,
      id_programa: this.subject.id_programa
    };

    if(this.subjectForm.get('nameInput')?.value === this.subject.nombre) {
      delete subjectData.nombre;
    }
    return subjectData;
  }

}
