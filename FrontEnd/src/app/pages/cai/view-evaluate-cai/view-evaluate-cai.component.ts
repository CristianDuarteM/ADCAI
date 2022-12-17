import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from 'src/app/constants/config';
import { Cai } from 'src/app/models/Cai';
import { Dialog } from 'src/app/models/Dialog';
import { EvaluateCaiModel } from 'src/app/models/EvaluateCai';
import { Feedback } from 'src/app/models/Feedback';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-view-evaluate-cai',
  templateUrl: './view-evaluate-cai.component.html',
  styleUrls: ['./view-evaluate-cai.component.css']
})
export class ViewEvaluateCaiComponent implements OnInit {

  backRouteViewEvaluateCai: string;
  titleViewEvaluateCai: string;
  isPrincipalViewEvaluateCai: boolean;
  isLoaded: boolean;
  dataCai: Cai;
  feedbackList: Feedback[];

  constructor(private route: ActivatedRoute, private caiService: CaiService, public dialog: Dialog,
    private rolePermission: RolePermission, private navigation: Router) {
    this.backRouteViewEvaluateCai = '/evaluar-cai';
    this.titleViewEvaluateCai = 'Evaluar Carga Académica Integral';
    this.isPrincipalViewEvaluateCai = false;
    this.dataCai = new Cai();
    this.isLoaded = false;
    this.feedbackList = [];
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.getCai();
  }

  getCai() {
    let idCai = this.route.snapshot.paramMap.get('idCai') || '';
    this.caiService.getCaiById(idCai).subscribe({
      next: caiResponse => {
        this.dataCai = caiResponse.cai;
        this.feedbackList = caiResponse.retroalimentaciones;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  approveEvaluateCai() {
    let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE);
    if(activeRole === 'DIRECTOR') {
      this.approveCaiDirector();
    } else if(activeRole === 'DECANO') {
      this.approveCaiDean();
    }
  }

  approveCaiDirector() {
    this.caiService.evaluateCaiDirector(this.dataCai.id, new EvaluateCaiModel(true)).subscribe({
      next: approveCaiDirectorResponse => {
        this.dialog.openDialog(approveCaiDirectorResponse.msg, '/evaluar-cai');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  approveCaiDean() {
    this.caiService.evaluateCaiDean(this.dataCai.id, new EvaluateCaiModel(true)).subscribe({
      next: approveCaiDeanResponse => {
        this.dialog.openDialog(approveCaiDeanResponse.msg, '/evaluar-cai');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  rejectEvaluateCai() {

  }

}
