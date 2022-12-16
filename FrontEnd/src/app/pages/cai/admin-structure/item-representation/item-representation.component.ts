import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { RepresentationActivities } from 'src/app/models/RepresentationActivities';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-item-representation',
  templateUrl: './item-representation.component.html',
  styleUrls: ['./item-representation.component.css']
})
export class ItemRepresentationComponent implements OnInit {

  idRepresentation: string;
  representationForm: FormGroup;
  backRouteRepresentationItem: string;
  titleRepresentationItem: string;
  isPrincipalRepresentationItem: boolean;
  dataRepresentationItem: RepresentationActivities;
  isLoaded: boolean;

  constructor(private route: ActivatedRoute, private dialog: Dialog, private caiService: CaiService, private rolePermission: RolePermission) {
    this.idRepresentation = route.snapshot.paramMap.get('idRepresentation') || '';
    this.representationForm = new FormGroup({});
    this.backRouteRepresentationItem = '/cai-admin';
    this.titleRepresentationItem = ((this.idRepresentation === '') ? 'Agregar ' : 'Actualizar ') + 'Actividad de Representación';
    this.isPrincipalRepresentationItem = false;
    this.dataRepresentationItem = new RepresentationActivities();
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    if(this.idRepresentation !== '') {
      this.getDataItemRepresentation();
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.representationForm = new FormGroup({
      activityName: new FormControl(this.dataRepresentationItem.nombre, [Validators.required]),
      description: new FormControl(this.dataRepresentationItem.descripcion, [Validators.required]),
      isList: new FormControl(this.dataRepresentationItem.listar + '', [Validators.required]),
    });
    this.isLoaded = true;
  }

  onSubmit() {
    if(this.representationForm.valid) {
      this.loadItemRepresentation();
      if(this.idRepresentation === '') {
        this.addItemRepresentation();
      } else {
        this.updateItemRepresentation();
      }
    } else {
      this.dialog.openDialog('Debe llenar todos los campos', '');
    }
  }

  addItemRepresentation() {
    this.caiService.addRepresentationItem(this.dataRepresentationItem).subscribe({
      next: itemRepresentationResponse => {
        this.dialog.openDialog(itemRepresentationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/representation/', error))
      }
    });
  }

  updateItemRepresentation() {
    this.caiService.updateRepresentationItem(this.idRepresentation, this.dataRepresentationItem).subscribe({
      next: itemRepresentationResponse => {
        this.dialog.openDialog(itemRepresentationResponse.msg, '/cai-admin');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/representation/' + this.idRepresentation, error))
      }
    });
  }

  getDataItemRepresentation() {
    this.caiService.getRepresentationItemById(this.idRepresentation).subscribe({
      next: itemRepresentationResponse => {
        this.dataRepresentationItem = itemRepresentationResponse;
        this.initForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin/representation/' + this.idRepresentation, error))
      }
    });
  }

  loadItemRepresentation() {
    this.dataRepresentationItem.nombre = this.representationForm.get('activityName')?.value;
    this.dataRepresentationItem.descripcion = this.representationForm.get('description')?.value;
    this.dataRepresentationItem.listar = (this.representationForm.get('isList')?.value === 'true') ? true : false;
  }

}
