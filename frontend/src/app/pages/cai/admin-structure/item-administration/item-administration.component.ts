import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdministrationActivities } from 'src/app/models/AdministrationActivities';
import { Dialog } from 'src/app/services/Dialog';
import { CaiService } from 'src/app/services/cai/cai.service';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-item-administration',
  templateUrl: './item-administration.component.html',
  styleUrls: ['./item-administration.component.css']
})
export class ItemAdministrationComponent implements OnInit {

  idAdministration: string;
  administrationForm: FormGroup;
  backRouteAdministrationItem: string;
  titleAdministrationItem: string;
  isPrincipalAdministrationItem: boolean;
  dataAdministrationItem: AdministrationActivities;
  isLoaded: boolean;

  constructor(private route: ActivatedRoute, private dialog: Dialog, private caiService: CaiService, private rolePermission: RolePermission) {
    this.idAdministration = route.snapshot.paramMap.get('idAdministration') || '';
    this.administrationForm = new FormGroup({});
    this.backRouteAdministrationItem = '/cai-admin';
    this.titleAdministrationItem = ((this.idAdministration === '') ? 'Agregar ' : 'Actualizar ') + 'Actividad de Administración';
    this.isPrincipalAdministrationItem = false;
    this.dataAdministrationItem = new AdministrationActivities();
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    if(this.idAdministration !== '') {
      this.getDataItemAdministration();
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.administrationForm = new FormGroup({
      activityName: new FormControl(this.dataAdministrationItem.nombre, [Validators.required]),
      isList: new FormControl(this.dataAdministrationItem.listar + '', [Validators.required]),
    });
    this.isLoaded = true;
  }

  onSubmit() {
    if(this.administrationForm.valid) {
      this.loadItemAdministrationData();
      if(this.idAdministration === '') {
        this.addItemAdministration();
      } else {
        this.updateItemAdministration();
      }
    } else {
      this.dialog.openDialog('Debe llenar todos los campos', '');
    }
  }

  addItemAdministration() {
    this.caiService.addAdministrationItem(this.dataAdministrationItem).subscribe({
      next: itemAdministrationResponse => {
        this.dialog.openDialog(itemAdministrationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/administracion/', error))
      }
    });
  }

  updateItemAdministration() {
    this.caiService.updateAdministrationItem(this.idAdministration, this.dataAdministrationItem).subscribe({
      next: itemAdministrationResponse => {
        this.dialog.openDialog(itemAdministrationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/administracion/' + this.idAdministration, error))
      }
    });
  }

  getDataItemAdministration() {
    this.caiService.getAdministrationItemById(this.idAdministration).subscribe({
      next: itemAdministrationResponse => {
        this.dataAdministrationItem = itemAdministrationResponse;
        this.initForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/administracion/' + this.idAdministration, error))
      }
    });
  }

  loadItemAdministrationData() {
    this.dataAdministrationItem.nombre = this.administrationForm.get('activityName')?.value;
    this.dataAdministrationItem.listar = (this.administrationForm.get('isList')?.value === 'true') ? true : false;
  }

}
