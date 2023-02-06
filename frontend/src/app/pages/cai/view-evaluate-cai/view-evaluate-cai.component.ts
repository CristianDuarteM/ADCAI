import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from 'src/app/constants/config';
import { Cai } from 'src/app/models/Cai';
import { Dialog } from 'src/app/services/Dialog';
import { EvaluateCai } from 'src/app/models/EvaluateCai';
import { Feedback } from 'src/app/models/Feedback';
import { User } from 'src/app/models/User';
import { CaiService } from 'src/app/services/cai/cai.service';
import { UserService } from 'src/app/services/user/user.service';
import { RolePermission } from 'src/app/services/RolePermission';

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
  user: User;
  fileEvent: File | null;
  pathFile: string;

  constructor(private route: ActivatedRoute, private caiService: CaiService, public dialog: Dialog,
    private rolePermission: RolePermission, private navigation: Router, private userService: UserService) {
    this.backRouteViewEvaluateCai = '/evaluar-cai';
    this.titleViewEvaluateCai = 'Evaluar Carga Académica Integral';
    this.isPrincipalViewEvaluateCai = false;
    this.dataCai = new Cai();
    this.isLoaded = false;
    this.feedbackList = [];
    this.user = new User();
    this.fileEvent = null;
    this.pathFile = '';
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.getCai();
    this.getDataUser();
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
    if(this.dataCai.periodo_docente_firmas.length > 0) {
      if(this.validateSignature()) {
        this.approveCaiByRole();
      } else {
        this.dialog.openDialog("Debe tener una firma asociada a su perfil para continuar", '');
      }
    } else {
      this.approveCaiByRole();
    }
  }

  approveCaiByRole() {
    let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE);
    if(activeRole === 'DIRECTOR') {
      this.approveCaiDirector();
    } else if(activeRole === 'DECANO') {
      this.approveCaiDean();
    }
  }

  approveCaiDirector() {
    this.caiService.evaluateCaiDirector(this.dataCai.id, new EvaluateCai(true)).subscribe({
      next: approveCaiDirectorResponse => {
        this.dialog.openDialog(approveCaiDirectorResponse.msg, '/evaluar-cai');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

  approveCaiDean() {
    this.caiService.evaluateCaiDean(this.dataCai.id, new EvaluateCai(true)).subscribe({
      next: approveCaiDeanResponse => {
        this.dialog.openDialog(approveCaiDeanResponse.msg, '/evaluar-cai');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

  rejectEvaluateCai() {
    this.navigation.navigate(['/evaluar-cai/rechazar/', this.dataCai.id])
  }

  validateSignature() {
    let signature = false;
    if(this.user.id_firma !== 0 && this.user.id_firma !== null) {
      signature = true;
    }
    return signature;
  }

  getDataUser() {
    let idUser = sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '';
    this.userService.getUserById(idUser).subscribe({
      next: userResponse => {
        this.user = userResponse.usuario;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

  loadFile(event: any) {
    if(event.target.files.length > 0) {
      this.fileEvent = event.target.files[0];
    }
  }

  addSignedFile() {
    let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE) || '';
    let idCai = this.route.snapshot.paramMap.get('idCai') || '';
    if(this.fileEvent !== null) {
      this.caiService.addSignedFile(activeRole, idCai, this.fileEvent).subscribe({
        next: addSignedCaiResponse => {
          this.dialog.openDialog(addSignedCaiResponse.msg, '/home');
        },
        error: (error: HttpErrorResponse) => {
          this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
        }
      });
    } else {
      this.dialog.openDialog('Debe seleccionar un archivo', '');
    }
  }

  getFile() {
    let idCai = this.route.snapshot.paramMap.get('idCai') || '';
    this.caiService.getCaiFileSigned(idCai + '').subscribe({
      next: caiFileResponse => {
        this.pathFile = caiFileResponse.msg;
        this.download();
        this.isLoaded = true;
      }
    });
  }

  download() {
    const downloadLink = document.createElement('a');
    downloadLink.href = this.pathFile;
    downloadLink.setAttribute('download', 'CAI.pdf');
    downloadLink.setAttribute('target', '_blank');
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

}
