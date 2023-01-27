import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/models/Dialog';
import { RolePermission } from 'src/app/models/RolePermission';
import { StudyPlan } from 'src/app/models/StudyPlan';
import { StudyPlanTable } from 'src/app/models/table/StudyPlanTable';
import { StudyPlanService } from 'src/app/services/studyPlan/study-plan.service';

@Component({
  selector: 'app-study-plan',
  templateUrl: './management-study-plan.component.html',
  styleUrls: ['./management-study-plan.component.css']
})
export class ManagementStudyPlanComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  columnsToDisplay: string[];
  headerTable: string;
  updateRoute: string;
  descriptionAction: string;
  elementsData: StudyPlanTable[];
  activeRole: string;
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private navigation: Router, private studyPlanService: StudyPlanService,
    private dialog: Dialog) {
    this.backRoute = '/home';
    this.title = 'Gestión de Plan de Estudios';
    this.isPrincipal = true;
    this.headerTable = 'Listado de Plan de Estudios';
    this.updateRoute = '/gestion-plan-estudio/editar';
    this.columnsToDisplay = ['Id', 'Nombre', 'Facultad', 'Activo', 'Opciones'];
    this.descriptionAction = 'el plan de estudios seleccionado';
    this.activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE) || '';
    this.elementsData = [];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getListStudyPlan();
    this.rolePermission.loadRole();
  }

  getListStudyPlan() {
    let enabled = this.activeRole === 'ADMIN' ? 'no' : 'si';
    this.studyPlanService.getStudyPlanList(enabled).subscribe({
      next: studyPlanListResponse => {
        this.elementsData = this.getInfoFaculty(studyPlanListResponse.rows);
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
      }
    });
  }

  redirectButton() {
    this.navigation.navigate(['/gestion-plan-estudio/agregar']);
  }

  getInfoFaculty(studyPlanList: StudyPlan[]): StudyPlanTable[] {
    let studyPlanData: StudyPlanTable[] = [];
    studyPlanList.forEach(studyPlan => {
      let facultyName = '';
      if(studyPlan.facultad !== null) {
        facultyName = studyPlan.facultad.nombre;
      }
      studyPlanData.push({
        ...studyPlan,
        nombreFacultad: facultyName.toLowerCase()
      });
    });
    return studyPlanData;
  }

}
