import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { RolePermission } from 'src/app/models/RolePermission';
import { SubjectResponse } from 'src/app/models/response/subjectResponse';
import { StudyPlanService } from 'src/app/services/studyPlan/study-plan.service';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-view-study-plan',
  templateUrl: './view-study-plan.component.html',
  styleUrls: ['./view-study-plan.component.css']
})
export class ViewStudyPlanComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  studyPlanForm: FormGroup;
  columnsToDisplay: string[];
  headerTable: string;
  elementsDataTable: SubjectResponse[];
  buttonRoute: string;
  idStudyPlan: string;
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private route: ActivatedRoute, public dialog: Dialog,
    private studyPlanService: StudyPlanService, private subjectService: SubjectService, private navigation: Router) {
      this.backRoute = '/gestion-plan-estudio';
      this.title = 'Visualizar Plan de Estudios';
      this.isPrincipal = false;
      this.studyPlanForm = new FormGroup({
        facultyInput: new FormControl({value: '', disabled: true}),
        nameInput: new FormControl({value: '', disabled: true}),
        stateForm: new FormControl({value: '', disabled: true}),
      });
      this.columnsToDisplay = ['Id', 'Nombre', 'Creditos', 'Horas Practicas', 'Horas Teoricas', 'Activo', 'Opciones'];
      this.headerTable = 'Listado de Asignaturas';
      this.elementsDataTable = [];
      this.buttonRoute = "/gestion-asignaturas/editar/";
      this.idStudyPlan = this.route.snapshot.paramMap.get('idStudyPlan') || '';
      this.isLoaded = false;
    }

  ngOnInit(): void {
    this.getSubjectsByStudyPlan();
    this.rolePermission.loadRole();
  }

  getSubjectsByStudyPlan() {
    this.subjectService.getSubjectLisByStudyPlan(this.idStudyPlan, 'no').subscribe({
      next: subjectListResponse => {
        this.elementsDataTable = subjectListResponse;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-plan-estudio/', error));
      }
    });
  }

  redirectAddSubject(typeAdd: string) {
    if (typeAdd === 'MANUAL') {
      this.navigation.navigate(['gestion-asignaturas/agregar/manual/plan-estudios/', this.idStudyPlan]);
    } else {
      this.navigation.navigate(['gestion-asignaturas/agregar/masivo/plan-estudios/', this.idStudyPlan]);
    }
  }

}
