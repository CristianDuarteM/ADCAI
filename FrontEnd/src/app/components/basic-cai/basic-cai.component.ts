import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CaiModel } from 'src/app/models/CaiModel';
import { Dialog } from 'src/app/models/Dialog';
import { CaiResponse } from 'src/app/models/response/CaiResponse';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-basic-cai',
  templateUrl: './basic-cai.component.html',
  styleUrls: ['./basic-cai.component.css']
})
export class BasicCaiComponent implements OnInit {

  @Input() basicCaiRequest: CaiModel;
  @Input() basicCaiUpdate: CaiResponse;
  @Input() isUpdate: boolean;
  requestCaiForm: FormGroup;

  constructor(public dialog: Dialog, private caiService: CaiService) {
    this.basicCaiRequest = {} as CaiModel;
    this.basicCaiUpdate = {} as CaiResponse;
    this.requestCaiForm = new FormGroup({});
    this.isUpdate = false;
  }

  ngOnInit(): void {
    let dateLimit = new Date();
    if(this.isUpdate) {
      let date = new Date(this.basicCaiUpdate.fecha_limite);
      date.setDate(date.getDate() + 1);
      dateLimit = date;
    } else {
      dateLimit = new Date(this.basicCaiRequest.limite);
    }
    this.requestCaiForm = new FormGroup({
      semesterInput: new FormControl({value: (this.isUpdate) ? this.basicCaiUpdate.semestre : this.basicCaiRequest.semestre, disabled: true}),
      yearInput: new FormControl({value: (this.isUpdate) ? this.basicCaiUpdate.anno : this.basicCaiRequest.anno, disabled: true}),
      dateInit: new FormControl({value: (this.isUpdate) ? this.basicCaiUpdate.fecha_inicio : this.basicCaiRequest.inicio, disabled: true}),
      dateInput: new FormControl({value: dateLimit, disabled: true})
    });
  }

  onSubmit() {
    let dateSelected = this.requestCaiForm.get('dateInput')?.value;
    if(dateSelected !== undefined){
      let dateInput = new Date(this.requestCaiForm.get('dateInput')?.value);
      let actualDate = new Date();
      if(this.isUpdate) {
        actualDate = new Date(this.basicCaiUpdate.fecha_inicio);
      }
      if(this.getDateFormat(dateInput) === this.getDateFormat(actualDate)) {
        this.dialog.openDialog("La fecha límite no puede ser la actual", '/gestion-cai/agregar');
      } else if(this.getDateFormat(dateInput) < this.getDateFormat(actualDate)) {
        this.dialog.openDialog("La fecha límite no puede ser menor a la actual", '/gestion-cai/agregar');
      } else {
        if(this.isUpdate) {
          this.updateCai(dateSelected);
        } else {
          this.requestCai(dateInput, actualDate);
        }
      }
    } else {
      this.dialog.openDialog("Fecha seleccionada errónea", '/gestion-cai/agregar');
    }
  }

  requestCai(dateInput: Date, actualDate: Date) {
    this.basicCaiRequest.inicio = this.getDateFormat(actualDate);
    this.basicCaiRequest.limite = this.getDateFormat(dateInput);
    this.caiService.requestCai(this.basicCaiRequest).subscribe({
      next: caiServiceResponse => {
        this.dialog.openDialog(caiServiceResponse.msg, '/gestion-cai');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-cai/agregar', error));
      }
    });
  }

  updateCai(date: string) {
    this.caiService.updateDateCai(this.basicCaiUpdate.id, date).subscribe({
      next: caiServiceUpdate => {
        this.dialog.openDialog(caiServiceUpdate.msg, '/gestion-cai');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-cai/agregar', error));
      }
    });
  }

  getDateFormat(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

}
