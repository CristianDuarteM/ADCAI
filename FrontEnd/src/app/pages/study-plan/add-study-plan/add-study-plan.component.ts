import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { FacultyResponse } from 'src/app/models/response/FacultyResponse';
import { RolePermission } from 'src/app/models/RolePermission';
import { FacultyService } from 'src/app/services/faculty/faculty.service';

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
    private navigation: Router) {
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

  addStudyPlan(typeLoad: string) {
    if(this.studyPlanForm.valid) {
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
        this.isLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), '/login');
      }
    });
  }

}
