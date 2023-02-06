import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/services/Dialog';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-load-file-signature',
  templateUrl: './load-file-signature.component.html',
  styleUrls: ['./load-file-signature.component.css']
})
export class LoadFileSignatureComponent implements OnInit {

  backRouteLoadFile: string;
  titleLoadFile: string;
  isPrincipalLoadFile: boolean;
  loadFileForm: FormGroup;
  routeFile: any;
  isLoaded: boolean;
  fileEvent: File | null;
  pathFile: string;

  constructor(private caiService: CaiService, private route: ActivatedRoute, private dialog: Dialog) {
    this.backRouteLoadFile = '/home';
    this.titleLoadFile = "Carga de Archivo Firmado";
    this.isPrincipalLoadFile = true;
    this.loadFileForm = new FormGroup({});
    this.isLoaded = false;
    this.fileEvent = null;
    this.pathFile = '';
  }

  ngOnInit(): void {
    this.loadFileForm = new FormGroup({
      signatureInputFile: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
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
    this.caiService.getCaiFile(idCai + '').subscribe({
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

  loadFile(event: any) {
    if(event.target.files.length > 0) {
      this.fileEvent = event.target.files[0];
    }
  }

  addSignedCai() {
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

}
