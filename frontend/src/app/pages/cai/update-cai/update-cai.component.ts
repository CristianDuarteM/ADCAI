import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cai } from 'src/app/models/Cai';
import { Dialog } from 'src/app/services/Dialog';
import { Feedback } from 'src/app/models/Feedback';
import { CaiService } from 'src/app/services/cai/cai.service';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-update-cai',
  templateUrl: './update-cai.component.html',
  styleUrls: ['./update-cai.component.css']
})
export class UpdateCaiComponent implements OnInit {

  backRouteUpdateCai: string;
  titleUpdateCai: string;
  isPrincipalUpdateCai: boolean;
  isLoaded: boolean;
  dataCai: Cai;
  feedbackList: Feedback[];

  constructor(private route: ActivatedRoute, private caiService: CaiService, public dialog: Dialog,
    private rolePermission: RolePermission) {
      this.backRouteUpdateCai = '/home';
      this.titleUpdateCai = 'Actualizar Carga Académica Integral';
      this.isPrincipalUpdateCai = true;
      this.isLoaded = false;
      this.dataCai = new Cai();
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

}
