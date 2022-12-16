import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { InvestigationActivitiesRequest } from 'src/app/models/request/InvestigationItemRequest';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-item-investigation',
  templateUrl: './item-investigation.component.html',
  styleUrls: ['./item-investigation.component.css']
})
export class ItemInvestigationComponent implements OnInit {

  idInvestigation: string;
  investigationForm: FormGroup;
  backRouteInvestigationItem: string;
  titleInvestigationItem: string;
  isPrincipalInvestigationItem: boolean;
  dataInvestigationItem: InvestigationActivitiesRequest;
  isLoaded: boolean;

  constructor(private route: ActivatedRoute, private dialog: Dialog, private caiService: CaiService, private rolePermission: RolePermission) {
    this.idInvestigation = route.snapshot.paramMap.get('idInvestigation') || '';
    this.investigationForm = new FormGroup({});
    this.backRouteInvestigationItem = '/cai-admin';
    this.titleInvestigationItem = ((this.idInvestigation === '') ? 'Agregar ' : 'Actualizar ') + 'Actividad de Investigación';
    this.isPrincipalInvestigationItem = false;
    this.dataInvestigationItem = new InvestigationActivitiesRequest();
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    if(this.idInvestigation !== '') {
      this.getDataItemInvestigation();
    } else{
      this.initForm();
    }
  }

  initForm() {
    this.investigationForm = new FormGroup({
      activityName: new FormControl(this.dataInvestigationItem.nombre, [Validators.required]),
      hoursDescription: new FormControl(this.dataInvestigationItem.descripcion_horas, [Validators.required]),
    });
    this.isLoaded = true;
  }

  onSubmit() {
    if(this.investigationForm.valid) {
      this.loadItemInvestigationData();
      if(this.idInvestigation === '') {
        this.addItemInvestigation();
      } else {
        this.updateItemInvestigation();
      }
    } else{
      this.dialog.openDialog('Debe llenar todos los campos', '');
    }
  }

  addItemInvestigation() {
    this.caiService.addInvestigationItem(this.dataInvestigationItem).subscribe({
      next: itemInvestigationResponse => {
        this.dialog.openDialog(itemInvestigationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/investigacion/', error));
      }
    });
  }

  updateItemInvestigation() {
    this.caiService.updateInvestigationItem(this.idInvestigation, this.dataInvestigationItem).subscribe({
      next: itemInvestigationResponse => {
        this.dialog.openDialog(itemInvestigationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/investigacion/' + this.idInvestigation, error))
      }
    });
  }

  getDataItemInvestigation() {
    this.caiService.getInvestigationItemById(this.idInvestigation).subscribe({
      next: itemInvestigationResponse => {
        this.dataInvestigationItem = itemInvestigationResponse;
        this.initForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/investigacion/' + this.idInvestigation, error))
      }
    });
  }

  loadItemInvestigationData() {
    this.dataInvestigationItem.nombre = this.investigationForm.get('activityName')?.value;
    this.dataInvestigationItem.descripcion_horas = this.investigationForm.get('hoursDescription')?.value;
  }

}
