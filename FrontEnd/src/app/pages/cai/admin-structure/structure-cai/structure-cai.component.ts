import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { InvestigationActivitiesTable } from 'src/app/models/table/InvestigationActivitiesTable';
import { TeacherActivitiesTable } from 'src/app/models/table/TeacherActivitiesTable';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-structure-cai',
  templateUrl: './structure-cai.component.html',
  styleUrls: ['./structure-cai.component.css']
})
export class StructureCaiComponent implements OnInit {

  caiForm: FormGroup;
  backRouteStructureCai: string;
  titleStructureCai: string;
  isPrincipalStructureCai: boolean;
  columnsToDisplayTeacherActivities: string[];
  columsToDisplayInvestigationActivities: string[];
  elementsDataTeacherActivities: TeacherActivitiesTable[];
  elementsDataInvestigationActivities: InvestigationActivitiesTable[];
  dataArrayTeacherActivities: MatTableDataSource<TeacherActivitiesTable>;
  dataArrayInvestigationActivities: MatTableDataSource<InvestigationActivitiesTable>;
  isLoaded: boolean;

  constructor(private fb: FormBuilder, private caiService: CaiService, private dialog: Dialog, private navigation: Router) {
    this.caiForm = new FormGroup({});
    this.backRouteStructureCai = '/historial-cai';
    this.titleStructureCai = 'Carga Académica Integral';
    this.isPrincipalStructureCai = false;
    this.columnsToDisplayTeacherActivities = ['PLAN DE ESTUDIOS', 'ASIGNATURAS', 'CR', 'H.T.', 'H.P.'];
    this.columsToDisplayInvestigationActivities = ['ACCION', 'ACTIVIDAD', 'DESCRIPCION', 'HORAS'];
    this.elementsDataTeacherActivities = [new TeacherActivitiesTable()];
    this.elementsDataInvestigationActivities = [];
    this.dataArrayTeacherActivities = new MatTableDataSource(this.elementsDataTeacherActivities);
    this.dataArrayInvestigationActivities = new MatTableDataSource([new InvestigationActivitiesTable()]);
    this.isLoaded = true;
  }

  ngOnInit(): void {
    this.initForm();
    this.inicializeDataInvestigationActivities();
  }

  initForm() {
    this.caiForm = this.fb.group({
      department: new FormControl({value: '', disabled: true}),
      semester: new FormControl({value: '', disabled: true}),
      teacher: new FormControl({value: '', disabled: true}),
      code: new FormControl({value: '', disabled: true}),
      dedication: new FormControl({value: '', disabled: true}),
      studyPlan: new FormControl({value: '', disabled: true}),
      subject: new FormControl({value: '', disabled: true}),
    });
  }

  inicializeDataInvestigationActivities() {
    this.caiService.getInvestigationActivityList().subscribe({
      next: investigationActivitiesResponse => {
        this.elementsDataInvestigationActivities = investigationActivitiesResponse;
        console.log(investigationActivitiesResponse);
        this.dataArrayInvestigationActivities = new MatTableDataSource(this.elementsDataInvestigationActivities);
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  redirectButtonUpdate(routeRedirect: string, idItem: string) {
    this.navigation.navigate([routeRedirect, idItem]);
  }

  redirectButtonAdd(routeRedirect: string) {
    this.navigation.navigate([routeRedirect]);
  }

  disableItemInvestigation(idInvestigationItem: string) {
    this.dialog.openDialogDisable(
      'el item de investigación seleccionado',
      'INVESTIGACION',
      idInvestigationItem
    );
  }

  enableItemInvestigation(idInvestigationItem: string) {
    this.dialog.openDialogEnable(
      'el item de investigación seleccionado',
      'INVESTIGACION',
      idInvestigationItem
    );
  }

}
