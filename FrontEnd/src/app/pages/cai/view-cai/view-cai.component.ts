import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cai } from 'src/app/models/Cai';
import { Dialog } from 'src/app/models/Dialog';
import { Feedback } from 'src/app/models/Feedback';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-view-cai',
  templateUrl: './view-cai.component.html',
  styleUrls: ['./view-cai.component.css']
})
export class ViewCaiComponent implements OnInit {

  backRouteViewCai: string;
  titleViewCai: string;
  isPrincipalViewCai: boolean;
  isLoaded: boolean;
  dataCai: Cai;
  feedbackList: Feedback[];
  pathFile: string;

  constructor(private route: ActivatedRoute, private caiService: CaiService, public dialog: Dialog,
    private rolePermission: RolePermission) {
    this.backRouteViewCai = '/historial-cai';
    this.titleViewCai = 'Carga Académica Integral';
    this.isPrincipalViewCai = false;
    this.dataCai = new Cai();
    this.isLoaded = false;
    this.feedbackList = [];
    this.pathFile = '';
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

  getFile() {
    let idCai = this.route.snapshot.paramMap.get('idCai') || '';
    if(this.dataCai.periodo_docente_firmas.length > 0) {
      this.getCaiLoaded(idCai);
    } else {
      this.getCaiEvidence(idCai);
    }
  }

  getCaiLoaded(idCai: string) {
    this.caiService.getCaiFile(idCai).subscribe({
      next: caiFileResponse => {
        this.pathFile = caiFileResponse.msg;
        this.download();
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

  getCaiEvidence(idCai: string) {
    this.caiService.getCaiFileSigned(idCai).subscribe({
      next: caiFileResponse => {
        this.pathFile = caiFileResponse.msg;
        this.download();
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

  download() {
    const downloadLink = document.createElement('a');
    downloadLink.href = this.pathFile;
    downloadLink.setAttribute('download', '123456.pdf');
    downloadLink.setAttribute('target', '_blank');
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

}
