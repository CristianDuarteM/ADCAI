import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/services/Dialog';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FacultyService } from 'src/app/services/faculty/faculty.service';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-add-study-plan',
  templateUrl: './add-study-plan.component.html',
  styleUrls: ['./add-study-plan.component.css']
})
export class AddStudyPlanComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  studyPlanForm: FormGroup;
  facultyList: FacultyResponse[];
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private dialog: Dialog, private facultySevice: FacultyService,
    private navigation: Router, private departmentService: DepartmentService) {
    this.backRoute = '/gestion-plan-estudio';
    this.title = 'Agregar Plan de Estudios';
    this.isPrincipal = false;
    this.studyPlanForm = new FormGroup({
      selectedFaculty: new FormControl('', [Validators.required]),
    });
    this.facultyList = [];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getFacultyList();
    this.rolePermission.loadRole();
  }

  loadFaculty() {
    let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE);
    if(activeRole === 'DIRECTOR') {
      this.departmentService.getDepartmentById(sessionStorage.getItem(config.SESSION_STORAGE.ID_DEPARTMENT) || '').subscribe({
        next: departmentResponse => {
          this.studyPlanForm.setControl('selectedFaculty', new FormControl({value: departmentResponse.id_facultad, disabled: true}));
        },
        error: (error: HttpErrorResponse) => {
          this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError(this.backRoute, error));
        }
      });
    }
  }

  addStudyPlan(typeLoad: string) {
    let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE);
    if(this.studyPlanForm.valid || activeRole === 'DIRECTOR') {
      let idFaculty = this.studyPlanForm.get('selectedFaculty')?.value;
      if(typeLoad === 'MASIVE') {
        this.massiveLoad(idFaculty);
      } else {
        this.manualLoad(idFaculty);
      }
    } else {
      this.dialog.openDialog('¡Diligencie los campos obligatorios!', '');
    }
  }

  massiveLoad(idFaculty: string) {
      this.navigation.navigate(['/gestion-plan-estudio/agregar/masivo/facultad/' + idFaculty]);
  }

  manualLoad(idFaculty: string) {
      this.navigation.navigate(['/gestion-plan-estudio/agregar/manual/facultad/' + idFaculty]);
  }

  getFacultyList() {
    this.facultySevice.getFacultyList().subscribe({
      next: facultyListResponse => {
        this.facultyList = facultyListResponse.rows;
        this.loadFaculty();
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
      }
    });
  }

}
