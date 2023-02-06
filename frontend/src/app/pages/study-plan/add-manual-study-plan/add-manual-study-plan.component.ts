import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/services/Dialog';
import { RolePermission } from 'src/app/services/RolePermission';
import { StudyPlanService } from 'src/app/services/studyPlan/study-plan.service';

@Component({
  selector: 'app-add-manual-study-plan',
  templateUrl: './add-manual-study-plan.component.html',
  styleUrls: ['./add-manual-study-plan.component.css']
})
export class AddManualStudyPlanComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  studyPlanForm: FormGroup;

  constructor(private rolePermission: RolePermission, private route: ActivatedRoute, private dialog: Dialog,
    private studyPlanService: StudyPlanService) {
    this.backRoute = '/gestion-plan-estudio/agregar';
    this.title = 'Agregar Plan de Estudios - Manual';
    this.isPrincipal = false;
    this.studyPlanForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

  addManualStudyPlan() {
    if(this.studyPlanForm.valid) {
      let idFaculty = this.route.snapshot.paramMap.get('idFaculty') || '';
      this.studyPlanService.addStudyPlanList([this.studyPlanForm.get('name')?.value], idFaculty).subscribe({
        next: addStudyPlanResponse => {
          this.dialog.openDialog(addStudyPlanResponse.msg, '/gestion-plan-estudio');
        },
        error: (error: HttpErrorResponse) => {
          this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError(this.backRoute, error));
        }
      });
    }
  }

}
