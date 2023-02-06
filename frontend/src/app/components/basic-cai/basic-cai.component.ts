import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CaiModel } from 'src/app/models/CaiModel';
import { Dialog } from 'src/app/services/Dialog';
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
  actualDate: Date;

  constructor(public dialog: Dialog, private caiService: CaiService) {
    this.basicCaiRequest = {} as CaiModel;
    this.basicCaiUpdate = new CaiResponse();
    this.requestCaiForm = new FormGroup({});
    this.isUpdate = false;
    this.actualDate = new Date();
    this.actualDate.setDate(this.actualDate.getDate() + 1);
  }

  ngOnInit(): void {
    let prueba = this.basicCaiUpdate.fecha_limite.split('-');
    let dateLimit = new Date(parseInt(prueba[0]), parseInt(prueba[1]) - 1, parseInt(prueba[2]));
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
    date.setHours(0,0,0,0);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

}
