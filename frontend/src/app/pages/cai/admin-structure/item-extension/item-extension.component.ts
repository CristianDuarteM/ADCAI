import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/services/Dialog';
import { ExtensionActivities } from 'src/app/models/ExtensionActivities';
import { CaiService } from 'src/app/services/cai/cai.service';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-item-extension',
  templateUrl: './item-extension.component.html',
  styleUrls: ['./item-extension.component.css']
})
export class ItemExtensionComponent implements OnInit {

  idExtension: string;
  extensionForm: FormGroup;
  backRouteExtensionItem: string;
  titleExtensionItem: string;
  isPrincipalExtensionItem: boolean;
  dataExtensionItem: ExtensionActivities;
  isLoaded: boolean;

  constructor(private route: ActivatedRoute, private dialog: Dialog, private caiService: CaiService, private rolePermission: RolePermission) {
    this.idExtension = route.snapshot.paramMap.get('idExtension') || '';
    this.extensionForm = new FormGroup({});
    this.backRouteExtensionItem = '/cai-admin';
    this.titleExtensionItem = ((this.idExtension === '') ? 'Agregar ' : 'Actualizar ') + 'Actividad de Extensión';
    this.isPrincipalExtensionItem = false;
    this.dataExtensionItem = new ExtensionActivities();
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    if(this.idExtension !== '') {
      this.getDataItemExtension();
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.extensionForm = new FormGroup({
      activityName: new FormControl(this.dataExtensionItem.nombre, [Validators.required]),
      description: new FormControl(this.dataExtensionItem.descripcion, [Validators.required]),
      isList: new FormControl(this.dataExtensionItem.listar + '', [Validators.required]),
    });
    this.isLoaded = true;
  }

  onSubmit() {
    if(this.extensionForm.valid){
      this.loadItemExtensionData();
      if(this.idExtension === '') {
        this.addItemExtension();
      } else {
        this.updateItemExtension();
      }
    } else {
      this.dialog.openDialog('Debe llenar todos los campos', '');
    }
  }

  addItemExtension() {
    this.caiService.addExtensionItem(this.dataExtensionItem).subscribe({
      next: itemExtensionResponse => {
        this.dialog.openDialog(itemExtensionResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/extension/', error))
      }
    });
  }

  updateItemExtension() {
    this.caiService.updateExtensionItem(this.idExtension, this.dataExtensionItem).subscribe({
      next: itemExtensionResponse => {
        this.dialog.openDialog(itemExtensionResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/extension/' + this.idExtension, error))
      }
    });
  }

  getDataItemExtension() {
    this.caiService.getExtensionItemById(this.idExtension).subscribe({
      next: itemExtensionResponse => {
        this.dataExtensionItem = itemExtensionResponse;
        this.initForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/extension/' + this.idExtension, error))
      }
    });
  }

  loadItemExtensionData() {
    this.dataExtensionItem.nombre = this.extensionForm.get('activityName')?.value;
    this.dataExtensionItem.descripcion = this.extensionForm.get('description')?.value;
    this.dataExtensionItem.listar = (this.extensionForm.get('isList')?.value === 'true') ? true : false;
  }

}
