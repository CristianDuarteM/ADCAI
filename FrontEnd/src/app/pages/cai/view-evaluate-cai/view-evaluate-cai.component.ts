import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
import { Cai } from 'src/app/models/Cai';
import { EvaluateCaiModel } from 'src/app/models/EvaluateCai';
import { Feedback } from 'src/app/models/Feedback';
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

  constructor(private route: ActivatedRoute, private caiService: CaiService, public dialog: MatDialog) {
    this.backRouteViewEvaluateCai = '/evaluar-cai';
    this.titleViewEvaluateCai = 'Evaluar Carga Académica Integral';
    this.isPrincipalViewEvaluateCai = false;
    this.dataCai = {} as Cai;
    this.isLoaded = false;
    this.feedbackList = [];
  }

  ngOnInit(): void {
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
        let redirectRoute = '/home';
        if(error.status === 401) {
          redirectRoute = '/login';
        }
        this.openDialog(error.error.msg, redirectRoute);
      }
    });
  }

  initEvaluateCai(approved: boolean): EvaluateCaiModel {
    return {
      aprobado: approved,
      docencia: '',
      investigacion: '',
      extension: '',
      administracion: '',
      representacion: '',
      otras: '',
    }
  }

  evaluateCai(approved: boolean) {
    if(approved) {
      this.caiService.evaluateCai(this.dataCai.id, this.initEvaluateCai(approved)).subscribe({
        next: evaluateCaiResponse => {
          this.openDialog(evaluateCaiResponse.msg, '/evaluar-cai');
        },
        error: (error: HttpErrorResponse) => {
          let redirectRoute = '/home';
          if(error.status === 401) {
            redirectRoute = '/login';
          }
          this.openDialog(error.error.msg, redirectRoute);
        }
      });
    }
  }

  openDialog(description: string, routeRedirect: string) {
    this.dialog.open(InformativeDialogComponent, {
      data: {
        description,
        routeRedirect
      },
      disableClose: true
    });
  }

}
