import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/constants/config';
import { Cai } from 'src/app/models/Cai';
import { Dialog } from 'src/app/services/Dialog';
import { CaiService } from 'src/app/services/cai/cai.service';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-fill-cai',
  templateUrl: './fill-cai.component.html',
  styleUrls: ['./fill-cai.component.css']
})
export class FillCaiComponent implements OnInit {

  backRouteFillCai: string;
  titleFillCai: string;
  isPrincipalFillCai: boolean;
  dataCai: Cai;
  loadedData: boolean;
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private caiService: CaiService, public dialog: Dialog) {
    this.backRouteFillCai = '/home';
    this.titleFillCai = 'Diligenciar Carga Académica Integral';
    this.isPrincipalFillCai = true;
    this.dataCai = new Cai();
    this.loadedData = false;
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.getLastCai();
  }

  getLastCai() {
    this.caiService.getCaiList(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '', 'docente', 'no').subscribe({
      next: caiServiceResponse => {
        if(caiServiceResponse.rows.length > 0) {
          this.dataCai = caiServiceResponse.rows[0];
          this.caiService.getCaiById(this.dataCai.id).subscribe({
            next: caiServiceByIdResponse => {
              this.dataCai = caiServiceByIdResponse.cai;
              this.loadedData = true;
              this.isLoaded = true;
            },
            error: (error: HttpErrorResponse) => {
              this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
            }
          });
        } else {
          this.isLoaded = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

}
