import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/models/Dialog';
import { EvaluateCai } from 'src/app/models/EvaluateCai';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-reject-cai',
  templateUrl: './reject-cai.component.html',
  styleUrls: ['./reject-cai.component.css']
})
export class RejectCaiComponent implements OnInit {

  idCai: string;
  evaluateCai: EvaluateCai;
  rejectCaiForm: FormGroup;
  backRouteRejectCai: string;
  titleRejectCai: string;
  isPrincipalRejectCai: boolean;
  validData: boolean;
  isLoaded: boolean;

  constructor(private route: ActivatedRoute, private dialog: Dialog, private caiService: CaiService, private rolePermission: RolePermission,
    private fb: FormBuilder) {
    this.idCai = route.snapshot.paramMap.get('idCai') || '';
    this.evaluateCai = new EvaluateCai(false);
    this.rejectCaiForm = new FormGroup({
      observationItems: this.fb.array([])
    });
    this.backRouteRejectCai = '/evaluar-cai/' + this.idCai;
    this.titleRejectCai = 'Rechazar Carga Académica Integral';
    this.isPrincipalRejectCai = false;
    this.validData = false;
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.inicializeObservationItemsForm();
  }

  get observations(): FormArray {
    return this.rejectCaiForm.get('observationItems') as FormArray;
  }

  inicializeObservationItemsForm() {
    this.observations.push(this.fb.group({
      observation: new FormControl('', [Validators.required]),
      section: new FormControl('', [Validators.required]),
    }));
    this.isLoaded = true;
  }

  addObservation() {
    if(this.observations.controls.length < 6) {
      this.observations.push(this.fb.group({
        observation: new FormControl('', [Validators.required]),
        section: new FormControl('', [Validators.required]),
      }));
    }
  }

  removeObservation() {
    if(this.observations.controls.length > 1) {
      this.observations.removeAt(this.observations.length - 1);
    }
  }

  onSubmit() {
    if(this.rejectCaiForm.valid) {
      this.loadDataObservation();
      if(this.validData) {
        let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE);
        if(activeRole === 'DECANO') {
          this.rejectCaiDean();
        } else if(activeRole === 'DIRECTOR') {
          this.rejectCaiDirector();
        }
      }
    } else {
      this.dialog.openDialog('Debe llenar todos los campos', '');
    }
  }

  loadDataObservation() {
    let observationList: number [] = [];
    let observationSelect;
    for(let i = 0; i < this.observations.controls.length; i++) {
      observationSelect = this.observations.controls[i].get('section')?.value;
      if(observationList.includes(observationSelect)) {
        this.validData = false;
        return this.dialog.openDialog('No puede asociar la misma sección para varias observaciones', '');
      } else {
        this.addEvaluateObservation(
          observationSelect,
          this.observations.controls[i].get('observation')?.value,
        )
        observationList.push(observationSelect);
      }
    }
    this.validData = true;
  }

  addEvaluateObservation(section: string, observation: string) {
    switch(section) {
      case '1':
        this.evaluateCai.docencia = observation;
        break;
      case '2':
        this.evaluateCai.investigacion = observation;
        break;
      case '3':
        this.evaluateCai.extension = observation;
        break;
      case '4':
        this.evaluateCai.administracion = observation;
        break;
      case '5':
        this.evaluateCai.representacion = observation;
        break;
      case '6':
        this.evaluateCai.otras = observation;
        break;
    }
  }

  rejectCaiDirector() {
    this.caiService.evaluateCaiDirector(this.idCai, this.evaluateCai).subscribe({
      next: rejectCaiDirectorResponse => {
        this.dialog.openDialog(rejectCaiDirectorResponse.msg, '/evaluar-cai');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

  rejectCaiDean() {
    this.caiService.evaluateCaiDean(this.idCai, this.evaluateCai).subscribe({
      next: rejectCaiDeanResponse => {
        this.dialog.openDialog(rejectCaiDeanResponse.msg, '/evaluar-cai');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

}
