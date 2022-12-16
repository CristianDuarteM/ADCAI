import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { OtherActivities } from 'src/app/models/OtherActivities';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-item-others',
  templateUrl: './item-others.component.html',
  styleUrls: ['./item-others.component.css']
})
export class ItemOthersComponent implements OnInit {

  idOther: string;
  otherForm: FormGroup;
  backRouteOtherItem: string;
  titleOtherItem: string;
  isPrincipalOtherItem: boolean;
  dataOtherItem: OtherActivities;
  isLoaded: boolean;

  constructor(private route: ActivatedRoute, private dialog: Dialog, private caiService: CaiService, private rolePermission: RolePermission) {
    this.idOther = route.snapshot.paramMap.get('idOther') || '';
    this.otherForm = new FormGroup({});
    this.backRouteOtherItem = '/cai-admin';
    this.titleOtherItem = ((this.idOther === '') ? 'Agregar ' : 'Actualizar ') + 'Actividad de Otras';
    this.isPrincipalOtherItem = false;
    this.dataOtherItem = new OtherActivities();
    this.isLoaded = false;
  }


  ngOnInit(): void {
    this.rolePermission.loadRole();
    if(this.idOther !== '') {
      this.getDataItemOther();
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.otherForm = new FormGroup({
      activityName: new FormControl(this.dataOtherItem.nombre, [Validators.required]),
      description: new FormControl(this.dataOtherItem.descripcion, [Validators.required]),
      isList: new FormControl(this.dataOtherItem.listar + '', [Validators.required]),
    });
    this.isLoaded = true;
  }

  onSubmit(){
    if(this.otherForm.valid) {
      this.loadItemOtherData();
      if(this.idOther === '') {
        this.addItemOther();
      } else {
        this.updateItemOther();
      }
    } else {
      this.dialog.openDialog('Debe llenar todos los campos', '');
    }
  }

  addItemOther() {
    this.caiService.addOtherItem(this.dataOtherItem).subscribe({
      next: itemOtherResponse => {
        this.dialog.openDialog(itemOtherResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/otras/', error))
      }
    });
  }

  updateItemOther(){
    this.caiService.updateOtherItem(this.idOther, this.dataOtherItem).subscribe({
      next: itemOtherResponse => {
        this.dialog.openDialog(itemOtherResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/otras/' + this.idOther, error))
      }
    });
  }

  getDataItemOther() {
    this.caiService.getOtherItemById(this.idOther).subscribe({
      next: itemOtherResponse => {
        this.dataOtherItem = itemOtherResponse;
        this.initForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/otras/' + this.idOther, error))
      }
    });
  }

  loadItemOtherData(){
    this.dataOtherItem.nombre = this.otherForm.get('activityName')?.value;
    this.dataOtherItem.descripcion = this.otherForm.get('description')?.value;
    this.dataOtherItem.listar = (this.otherForm.get('isList')?.value === 'true') ? true : false;
  }

}
