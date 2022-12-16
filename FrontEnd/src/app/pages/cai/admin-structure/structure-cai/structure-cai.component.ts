import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdministrationActivities } from 'src/app/models/AdministrationActivities';
import { Dialog } from 'src/app/models/Dialog';
import { ExtensionActivities } from 'src/app/models/ExtensionActivities';
import { Note } from 'src/app/models/Note';
import { OtherActivities } from 'src/app/models/OtherActivities';
import { RepresentationActivities } from 'src/app/models/RepresentationActivities';
import { RolePermission } from 'src/app/models/RolePermission';
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
  columnsToDisplayExtensionActivities: string[];
  columnsToDisplayAdministrationActivities: string[];
  columnsToDisplayRepresentationActivities: string[];
  columnsToDisplayOtherActivities: string[];
  columnsToDisplayNotes: string[];
  elementsDataTeacherActivities: TeacherActivitiesTable[];
  elementsDataInvestigationActivities: InvestigationActivitiesTable[];
  elementsDataExtensionActivities: ExtensionActivities[];
  elementsDataAdministrationActivities: AdministrationActivities[];
  elementsDataRepresentationActivities: RepresentationActivities[];
  elementsDataOtherActivities: OtherActivities[];
  elementsDataNotes: Note[];
  dataArrayTeacherActivities: MatTableDataSource<TeacherActivitiesTable>;
  dataArrayInvestigationActivities: MatTableDataSource<InvestigationActivitiesTable>;
  dataArrayExtensionActivities: MatTableDataSource<ExtensionActivities>;
  dataArrayAdministrationActivities: MatTableDataSource<AdministrationActivities>;
  dataArrayRepresentationActivities: MatTableDataSource<RepresentationActivities>;
  dataArrayOtherActivities: MatTableDataSource<OtherActivities>;
  dataArrayNotes: MatTableDataSource<Note>;
  isLoaded: number;

  constructor(private fb: FormBuilder, private caiService: CaiService, private dialog: Dialog, private navigation: Router,
    private rolePermission: RolePermission) {
    this.caiForm = new FormGroup({});
    this.backRouteStructureCai = '/historial-cai';
    this.titleStructureCai = 'Carga Académica Integral';
    this.isPrincipalStructureCai = true;
    this.columnsToDisplayTeacherActivities = ['PLAN DE ESTUDIOS', 'ASIGNATURAS', 'CR', 'H.T.', 'H.P.'];
    this.columsToDisplayInvestigationActivities = ['ACCIÓN', 'ACTIVIDAD', 'DESCRIPCIÓN', 'HORAS'];
    this.columnsToDisplayExtensionActivities = ['ACCIÓN', 'ACTIVIDAD', 'DESCRIPCIÓN', 'ENUNCIAR', 'HORAS'];
    this.columnsToDisplayAdministrationActivities = ['ACCIÓN', 'DESCRIPCIÓN', 'ENUNCIAR', 'HORAS'];
    this.columnsToDisplayRepresentationActivities = ['ACCIÓN', 'ACTIVIDAD', 'DESCRIPCIÓN', 'ENUNCIAR', 'HORAS'];
    this.columnsToDisplayOtherActivities = ['ACCIÓN', 'ACTIVIDAD', 'DESCRIPCIÓN HORAS', 'ENUNCIAR', 'HORAS'];
    this.columnsToDisplayNotes = ['ACCIÓN', 'ENUNCIADO'];
    this.elementsDataTeacherActivities = [new TeacherActivitiesTable()];
    this.elementsDataInvestigationActivities = [];
    this.elementsDataExtensionActivities = [];
    this.elementsDataAdministrationActivities = [];
    this.elementsDataRepresentationActivities = [];
    this.elementsDataOtherActivities = [];
    this.elementsDataNotes = [];
    this.dataArrayTeacherActivities = new MatTableDataSource(this.elementsDataTeacherActivities);
    this.dataArrayInvestigationActivities = new MatTableDataSource([new InvestigationActivitiesTable()]);
    this.dataArrayExtensionActivities = new MatTableDataSource();
    this.dataArrayAdministrationActivities = new MatTableDataSource();
    this.dataArrayRepresentationActivities = new MatTableDataSource();
    this.dataArrayOtherActivities = new MatTableDataSource();
    this.dataArrayNotes = new MatTableDataSource();
    this.isLoaded = 0;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.initForm();
    this.inicializeDataInvestigationActivities();
    this.inicializeDataExtensionActivities();
    this.inicializeDataAdministrationActivities();
    this.inicializeDataRepresentationActivities();
    this.inicializeDataOtherActivities();
    this.inicializeDataNotes();
  }

  initForm() {
    this.caiForm = this.fb.group({
      studyPlan: new FormControl({value: '', disabled: true}),
      subject: new FormControl({value: '', disabled: true}),
    });
  }

  inicializeDataInvestigationActivities() {
    this.caiService.getInvestigationActivityListWithFilter('no').subscribe({
      next: investigationActivitiesResponse => {
        this.elementsDataInvestigationActivities = investigationActivitiesResponse;
        this.dataArrayInvestigationActivities = new MatTableDataSource(this.elementsDataInvestigationActivities);
        this.isLoaded++;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  inicializeDataExtensionActivities() {
    this.caiService.getExtensionActivityListWithFilter('no').subscribe({
      next: extensionActivitiesResponse => {
        this.elementsDataExtensionActivities = extensionActivitiesResponse.rows;
        this.dataArrayExtensionActivities = new MatTableDataSource(this.elementsDataExtensionActivities);
        this.isLoaded++;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  inicializeDataAdministrationActivities() {
    this.caiService.getAdministrationActivityListWithFilter('no').subscribe({
      next: administrationActivitiesResponse => {
        this.elementsDataAdministrationActivities = administrationActivitiesResponse;
        this.dataArrayAdministrationActivities = new MatTableDataSource(this.elementsDataAdministrationActivities);
        this.isLoaded++;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  inicializeDataRepresentationActivities() {
    this.caiService.getRepresentationActivityListWithFilter('no').subscribe({
      next: representationActivitiesResponse =>{
        this.elementsDataRepresentationActivities = representationActivitiesResponse;
        this.dataArrayRepresentationActivities = new MatTableDataSource(this.elementsDataRepresentationActivities);
        this.isLoaded++;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  inicializeDataOtherActivities() {
    this.caiService.getOtherActivityListWithFilter('no').subscribe({
      next: otherActivitiesResponse => {
        this.elementsDataOtherActivities = otherActivitiesResponse;
        this.dataArrayOtherActivities = new MatTableDataSource(this.elementsDataOtherActivities);
        this.isLoaded++;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  inicializeDataNotes() {
    this.caiService.getNoteListWithFilter('no').subscribe({
      next: notesResponse => {
        this.elementsDataNotes = notesResponse;
        this.dataArrayNotes = new MatTableDataSource(this.elementsDataNotes);
        console.log(notesResponse);
        this.isLoaded++;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/cai-admin', error));
      }
    });
  }

  redirectButtonUpdate(routeRedirect: string, idItem: string) {
    this.navigation.navigate([routeRedirect, idItem]);
  }

  redirectButtonAdd(routeRedirect: string) {
    this.navigation.navigate([routeRedirect]);
  }

  disableItem(id: string, component: string, description: string) {
    this.dialog.openDialogDisable(
      description,
      component,
      id
    );
  }

  enableItem(id: string, component: string, description: string) {
    this.dialog.openDialogEnable(
      description,
      component,
      id
    );
  }

}
