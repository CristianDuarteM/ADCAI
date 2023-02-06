import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/services/Dialog';
import { StudyPlanRequest } from 'src/app/models/request/StudyPlanRequest';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { StudyPlanResponse } from 'src/app/models/response/StudyPlanResponse';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { StudyPlanService } from 'src/app/services/studyPlan/study-plan.service';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-update-study-plan',
  templateUrl: './update-study-plan.component.html',
  styleUrls: ['./update-study-plan.component.css']
})
export class UpdateStudyPlanComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  studyPlanForm: FormGroup;
  facultyList: FacultyResponse[];
  idStudyPlan: string;
  studyPlan: StudyPlanResponse;
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private facultyService: FacultyService, private dialog: Dialog,
    private studyPlanService: StudyPlanService, private route: ActivatedRoute) {
    this.backRoute = '/gestion-plan-estudio';
    this.title = 'Actualizar Plan de Estudios';
    this.isPrincipal = false;
    this.studyPlanForm = new FormGroup({});
    this.facultyList = [];
    this.idStudyPlan = this.route.snapshot.paramMap.get('idStudyPlan') || '';
    this.studyPlan = new StudyPlanResponse();
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.getFacultyList();

    let activeRoleFaculty = (sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE) === 'DIRECTOR') ? true : false;
    this.studyPlanForm = new FormGroup({
      facultyInput: new FormControl({value: '', disabled: activeRoleFaculty}, Validators.required),
      nameInput: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if(this.studyPlanForm.valid) {
      let studyPlanData: StudyPlanRequest = {
        nombre: this.studyPlanForm.get('nameInput')?.value,
        id_facultad: this.studyPlanForm.get('facultyInput')?.value,
        estado: (this.studyPlanForm.get('state')?.value === 'true') ? true : false,
      };

      if(this.studyPlan.nombre === studyPlanData.nombre) {
        delete studyPlanData.nombre;
      }
      this.studyPlanService.updateStudyPlan(this.idStudyPlan, studyPlanData).subscribe({
        next: studyPlanResponse => {
          this.dialog.openDialog(studyPlanResponse.msg, '/gestion-plan-estudio');
        },
        error: (error: HttpErrorResponse) => {
          this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
        }
      });
    } else {
      this.dialog.openDialog('¡Diligencie los campos faltantes!', '');
    }
  }

  getFacultyList() {
    this.facultyService.getFacultyList().subscribe({
      next: facultyListResponse => {
        this.facultyList = facultyListResponse.rows;
        this.loadStudyPlanData();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
      }
    });
  }

  loadStudyPlanData() {
    this.studyPlanService.getStudyPlanById(this.idStudyPlan).subscribe({
      next: studyPlanResponse => {
        this.studyPlan = studyPlanResponse;
        this.studyPlanForm.setValue({
          facultyInput: studyPlanResponse.facultad.id,
          nameInput: studyPlanResponse.nombre,
          state: (studyPlanResponse.estado) ? 'true' : 'false',
        });
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
      }
    });
  }

}
