import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { RolePermission } from 'src/app/models/RolePermission';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { StudyPlanService } from 'src/app/services/studyPlan/study-plan.service';

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
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private facultyService: FacultyService, private dialog: Dialog,
    private studyPlanService: StudyPlanService, private route: ActivatedRoute) {
    this.backRoute = '/gestion-plan-estudio';
    this.title = 'Actualizar Plan de Estudios';
    this.isPrincipal = false;
    this.studyPlanForm = new FormGroup({});
    this.facultyList = [];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.getFacultyList();
    //this.loadStudyPlanData();

    this.studyPlanForm = new FormGroup({
      facultyInput: new FormControl(''),
      nameInput: new FormControl(''),
      state: new FormControl(''),
    });
  }

  onSubmit() {

  }

  getFacultyList() {
    this.facultyService.getFacultyList().subscribe({
      next: facultyListResponse => {
        this.facultyList = facultyListResponse.rows;
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
      }
    });
  }

  loadStudyPlanData() {
    let idStudyPlan = this.route.snapshot.paramMap.get('idStudyPlan') || '';
    this.studyPlanService.getStudyPlanById(idStudyPlan).subscribe({
      next: studyPlanResponse => {
        console.log(studyPlanResponse);
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
      }
    });
  }

}
