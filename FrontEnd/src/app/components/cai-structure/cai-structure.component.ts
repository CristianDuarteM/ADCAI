import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CaiRequest } from 'src/app/models/request/CaiRequest';
import { StudyPlanResponse } from 'src/app/models/response/StudyPlanResponse';
import { ExtensionActivities } from 'src/app/models/ExtensionActivities';
import { InvestigationActivitiesTable } from 'src/app/models/table/InvestigationActivitiesTable';
import { TeacherActivitiesTable } from 'src/app/models/table/TeacherActivitiesTable';
import { TotalHours } from 'src/app/models/TotalHours';
import { CaiService } from 'src/app/services/cai/cai.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';
import { AdministrationActivities } from 'src/app/models/AdministrationActivities';
import { RepresentationActivities } from 'src/app/models/RepresentationActivities';
import { OtherActivities } from 'src/app/models/OtherActivities';
import { UserService } from 'src/app/services/user/user.service';
import { config } from 'src/app/constants/config';
import { DepartmentService } from 'src/app/services/department/department.service';
import { AddSignatureComponent } from 'src/app/pages/user/add-signature/add-signature.component';

@Component({
  selector: 'app-cai-structure',
  templateUrl: './cai-structure.component.html',
  styleUrls: ['./cai-structure.component.css']
})
export class CaiStructureComponent implements OnInit {

  caiRequest: CaiRequest;
  caiForm: FormGroup;
  studyPlanForm: FormGroup;
  subjectForm: FormGroup;
  investigationActivitiesForm: FormGroup;
  columnsToDisplayTeacherActivities: string[];
  columsToDisplayInvestigationActivities: string[];
  studyPlanList: StudyPlanResponse[];
  elementsDataTeacherActivities: TeacherActivitiesTable[];
  elementsDataInvestigationActivities: InvestigationActivitiesTable[];
  elementsDataExtensionActivities: ExtensionActivities[];
  elementsDataAdministrationActivities: AdministrationActivities[];
  elementsDataRepresentationActivities: RepresentationActivities[];
  elementsDataOtherActivities: OtherActivities[];
  dataArrayTeacherActivities: MatTableDataSource<TeacherActivitiesTable>;
  dataArrayInvestigationActivities: MatTableDataSource<InvestigationActivitiesTable>;
  @ViewChild('tableTeacherActivities') table: MatTable<any> | undefined;
  indexStudyPlan: string;
  totalHours: TotalHours;
  idSignature: string;
  validHours: boolean;

  constructor(private caiService: CaiService, public dialog: MatDialog, private fb: FormBuilder, private userService: UserService,
    private departmentService: DepartmentService) {
    this.caiRequest = {} as CaiRequest;
    this.columnsToDisplayTeacherActivities = ['PLAN DE ESTUDIOS', 'ASIGNATURAS', 'CR', 'H.T.', 'H.P.'];
    this.columsToDisplayInvestigationActivities = ['ACTIVIDAD', 'DESCRIPCION', 'HORAS'];
    this.caiForm = new FormGroup({});
    this.studyPlanForm = new FormGroup({});
    this.subjectForm = new FormGroup({});
    this.investigationActivitiesForm = new FormGroup({});
    this.studyPlanList = [];
    this.elementsDataTeacherActivities = [];
    this.elementsDataInvestigationActivities = [];
    this.elementsDataExtensionActivities = [];
    this.elementsDataAdministrationActivities = [];
    this.elementsDataRepresentationActivities = [];
    this.elementsDataOtherActivities = [];
    this.dataArrayTeacherActivities = new MatTableDataSource(undefined);
    this.dataArrayInvestigationActivities = new MatTableDataSource(undefined);
    this.table = undefined;
    this.indexStudyPlan = '';
    this.totalHours = {
      totalTeacherActivities: 0,
      subtotalTeacherActivities: 0,
      subtotalInvestigationActivities: 0,
      subtotalExtensionActivities: 0,
      subtotalAdministrationActivities: 0,
      subtotalRepresentationActivities: 0,
      subtotalOtherActivities: 0,
      totalCai: 0
    };
    this.idSignature = '';
    this.validHours = true;
  }

  ngOnInit(): void {
    this.getDataUser();
    this.elementsDataTeacherActivities = [{} as TeacherActivitiesTable];
    this.dataArrayTeacherActivities = new MatTableDataSource(this.elementsDataTeacherActivities);
    this.inicializeCaiForm();
    this.studyPlanForm = Object.assign(new FormGroup({}), this.caiForm.get('studyPlan'));
    this.subjectForm = Object.assign(new FormGroup({}), this.caiForm.get('subject'));
    this.investigationActivitiesForm = Object.assign(new FormGroup({}), this.caiForm.get('investigationActivities'));
    this.inicializeTeacherActivitiesForm();
    this.getStudyPlan();
    this.inicializeDataInvestigationActivities();
    this.inicializeDataExtensionActivities();
    this.inicializeDataAdministrationActivities();
    this.inicializeDataRepresentationActivities();
    this.inicializeDataOtherActivities();
  }

  onSubmit() {
    if(this.caiForm.valid) {
      this.loadTeacherActivities();
      this.loadInvestigationActivities();
      this.loadExtensionActivities();
      this.loadAdministrationActivities();
      this.loadRepresentationActivities();
      this.loadOtherActivities();
      if(!this.validHours) {
        this.validHours = true;
        return this.openDialog('¡¡No se aceptan números negativos!!', '');
      }
      if(this.idSignature === ''){
        if(sessionStorage.getItem('idSignature') !== null) {
          this.idSignature = sessionStorage.getItem('idSignature') || '';
        } else {
          return this.addSignature();
        }
      }
      this.loadDataCai();
      this.fillCai();
    } else {
      console.log(this.caiForm);
      this.openDialog('¡¡Faltan campos por diligenciar!!', '');
    }
  }

  fillCai() {
    this.caiService.fillCai(this.caiRequest).subscribe({
      next: caiServiceResponse => {
        this.openDialog(caiServiceResponse.msg, '/home');
      },
      error: (error: HttpErrorResponse) => {
        let route = '';
        let errorMessage = (error.error.msg === undefined) ? error.error.errors[0].msg : error.error.msg;
        if(error.status === 401) {
          sessionStorage.clear();
          route = '/login';
        }
        this.openDialog(errorMessage, route);
      }
    });
  }

  getDataUser() {
    this.userService.getUserById(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '').subscribe({
      next: userServiceResponse => {
        if(userServiceResponse.usuario.id_departamento === null) {
          return this.openDialog('No se encuentra asociado a algún departamento', '/home');
        } else{
          if(userServiceResponse.usuario.id_firma !== null && userServiceResponse.usuario.id_firma !== '') {
            this.idSignature = userServiceResponse.usuario.id_firma;
          }
          this.getDepartment(userServiceResponse.usuario.id_departamento);
          this.caiForm.setControl('semester', new FormControl({value: this.getSemester(), disabled: true}, [Validators.required]));
          this.caiForm.setControl('teacher', new FormControl({value: userServiceResponse.usuario.nombre + ' ' +
          userServiceResponse.usuario.apellido, disabled: true}, [Validators.required]));
          this.caiForm.setControl('code', new FormControl({value: userServiceResponse.usuario.codigo, disabled: true}, [Validators.required]));
        }
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/diligenciar-cai'));
      }
    });
  }

  getDepartment(idDepartment: string) {
    this.departmentService.getDepartmentById(idDepartment).subscribe({
      next: departmentResponse => {
        this.caiForm.setControl('department', new FormControl({value: departmentResponse.nombre, disabled: true}, [Validators.required]));
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/home'));
      }
    });
  }

  getSemester() {
    let date = new Date();
    if(date.getMonth() < 6) {
      return 'I';
    }
    return 'II';
  }

  getStudyPlan() {
    this.caiService.getStudyPlanList().subscribe({
      next: studyPlanListServiceResponse => {
        this.studyPlanList = studyPlanListServiceResponse.rows;
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/home'));
      }
    });
  }

  loadSubjectList(idStudyPlan: string) {
    let idTable = idStudyPlan.split('-');
    this.caiService.getSubjectListByStudyPlan(idTable[1]).subscribe({
      next: subjectListResponse => {
        let index = idTable[0].length - 1;
        this.indexStudyPlan = idTable[0][index];
        this.elementsDataTeacherActivities[parseInt(this.indexStudyPlan)].studyPlan = idTable[1];
        this.elementsDataTeacherActivities[parseInt(this.indexStudyPlan)].subjectList = subjectListResponse;
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/home'));
      }
    });
  }

  loadSubjectData(idSubject: string) {
    let idTable = idSubject.split('-');
    this.caiService.getSubjectListById(idTable[1]).subscribe({
      next: subjectResponse => {
        let index: number = idTable[0].length - 1;
        index = parseInt(idTable[0][index]);
        this.elementsDataTeacherActivities[index].subject = idTable[1];
        this.elementsDataTeacherActivities[index].credits = subjectResponse.creditos;
        this.elementsDataTeacherActivities[index].theoreticalHours = subjectResponse.horas_teoricas;
        this.elementsDataTeacherActivities[index].practicalHours = subjectResponse.horas_practicas;
        this.getHoursTeacherActivities();
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/diligenciar-cai'));
      }
    });
  }

  get extensionActivities(): FormArray {
    return this.caiForm.get('extensionActivities') as FormArray;
  }

  getItemsExtension(index: number): FormArray {
    return this.extensionActivities.controls[index].get('itemsExtension') as FormArray;
  }

  get administrationActivities(): FormArray {
    return this.caiForm.get('administrationActivities') as FormArray;
  }

  getItemsAdministration(index: number): FormArray {
    return this.administrationActivities.controls[index].get('itemsAdministration') as FormArray;
  }

  get representationActivities(): FormArray {
    return this.caiForm.get('representationActivities') as FormArray;
  }

  getItemsRepresentation(index: number): FormArray {
    return this.representationActivities.controls[index].get('itemsRepresentation') as FormArray;
  }

  get otherActivities(): FormArray {
    return this.caiForm.get('otherActivities') as FormArray;
  }

  getItemsOther(index: number): FormArray {
    return this.otherActivities.controls[index].get('itemsOther') as FormArray;
  }

  inicializeCaiForm() {
    this.caiForm = this.fb.group({
      department: new FormControl({value: '', disabled: true}, [Validators.required]),
      semester: new FormControl({value: '', disabled: true}, [Validators.required]),
      teacher: new FormControl({value: '', disabled: true}, [Validators.required]),
      code: new FormControl({value: '', disabled: true}, [Validators.required]),
      dedication: new FormControl('', [Validators.required]),
      studyPlan: new FormGroup({}),
      subject: new FormGroup({}),
      investigationActivities: new FormGroup({}),
      extensionActivities: this.fb.array([]),
      administrationActivities: this.fb.array([]),
      representationActivities: this.fb.array([]),
      otherActivities: this.fb.array([]),
      observations: new FormControl(''),
      signature: new FormControl('true', [Validators.required]),
    });
  }

  inicializeTeacherActivitiesForm() {
    for(let i = 0; i < this.elementsDataTeacherActivities.length; i++) {
      this.studyPlanForm.addControl('studyPlan'+ i, new FormControl('0', [Validators.required]));
      this.subjectForm.addControl('subject' + i, new FormControl('0', [Validators.required]));
      this.elementsDataTeacherActivities[i].nameFormStudyPlan = 'studyPlan' + i;
      this.elementsDataTeacherActivities[i].nameFormSubject = 'subject' + i;
    }
  }

  inicializeInvestigationActivitiesForm() {
    for(let i = 0; i < this.elementsDataInvestigationActivities.length; i++) {
      this.investigationActivitiesForm.addControl('investigationActivity' + i, new FormControl(''));
      this.elementsDataInvestigationActivities[i].nombreFormInput = 'investigationActivity' + i;
    }
  }

  inicializeExtensionActivitiesForm() {
    for(let i = 0; i < this.elementsDataExtensionActivities.length; i++) {
      this.extensionActivities.push(this.fb.group({
        hours: new FormControl(),
        itemsExtension: this.fb.array([new FormControl('')]),
      }));
    }
  }

  inicializeAdministrationActivitiesForm() {
    for(let i = 0; i < this.elementsDataAdministrationActivities.length; i++) {
      this.administrationActivities.push(this.fb.group({
        hours: new FormControl(),
        itemsAdministration: this.fb.array([new FormControl('')]),
      }));
    }
  }

  inicializeRepresentationActivitiesForm() {
    for(let i = 0; i < this.elementsDataRepresentationActivities.length; i++) {
      this.representationActivities.push(this.fb.group({
        hours: new FormControl(),
        itemsRepresentation: this.fb.array([new FormControl('')]),
      }));
    }
  }

  inicializeOtherActivitiesForm() {
    for(let i = 0; i < this.elementsDataOtherActivities.length; i++) {
      this.otherActivities.push(this.fb.group({
        hours: new FormControl(),
        itemsOther: this.fb.array([new FormControl('')]),
      }));
    }
  }

  inicializeDataInvestigationActivities() {
    this.caiService.getInvestigationActivityList().subscribe({
      next: investigationActivitiesResponse => {
        this.elementsDataInvestigationActivities = investigationActivitiesResponse;
        this.dataArrayInvestigationActivities = new MatTableDataSource(this.elementsDataInvestigationActivities);
        this.inicializeInvestigationActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/home'));
      }
    });
  }

  inicializeDataExtensionActivities() {
    this.caiService.getExtensionActivityList().subscribe({
      next: extensionActivitiesResponse => {
        this.elementsDataExtensionActivities = extensionActivitiesResponse.rows;
        this.inicializeExtensionActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/home'));
      }
    });
  }

  inicializeDataAdministrationActivities() {
    this.caiService.getAdministrationActivityList().subscribe({
      next: administrationActivitiesResponse => {
        this.elementsDataAdministrationActivities = administrationActivitiesResponse;
        this.inicializeAdministrationActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/home'));
      }
    });
  }

  inicializeDataRepresentationActivities() {
    this.caiService.getRepresentationActivityList().subscribe({
      next: representationActivitiesResponse => {
        this.elementsDataRepresentationActivities = representationActivitiesResponse;
        this.inicializeRepresentationActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/home'));
      }
    });
  }

  inicializeDataOtherActivities() {
    this.caiService.getOtherActivityList().subscribe({
      next: otherActivitiesResponse => {
        this.elementsDataOtherActivities = otherActivitiesResponse;
        this.inicializeOtherActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error, '/home'));
      }
    });
  }

  addRowTeacherActivities() {
    this.elementsDataTeacherActivities.push({} as TeacherActivitiesTable);
    let index = this.elementsDataTeacherActivities.length - 1;
    this.elementsDataTeacherActivities[index].nameFormStudyPlan = 'studyPlan' + index;
    this.elementsDataTeacherActivities[index].nameFormSubject = 'subject' + index;

    this.studyPlanForm.addControl('studyPlan'+index, new FormControl('0', [Validators.required]));
    this.subjectForm.addControl('subject' + index, new FormControl('0', [Validators.required]));
    if(this.table !== undefined) {
      this.table.renderRows();
    }
  }

  removeRowTeacherActivities() {
    let index = this.elementsDataTeacherActivities.length - 1;
    this.totalHours.totalTeacherActivities -= this.elementsDataTeacherActivities[index].theoreticalHours -
    this.elementsDataTeacherActivities[index].practicalHours;
    this.studyPlanForm.removeControl('studyPlan' + index);
    this.subjectForm.removeControl('subject' + index);
    this.elementsDataTeacherActivities.pop();
    this.getHoursTeacherActivities();
    if(this.table !== undefined) {
      this.table.renderRows();
    }
  }

  addItemExtension(index: number) {
    this.getItemsExtension(index).push(new FormControl());
  }

  removeItemExtension(index: number) {
    this.getItemsExtension(index).removeAt(this.getItemsExtension(index).controls.length - 1);
  }

  addItemAdministration(index: number) {
    this.getItemsAdministration(index).push(new FormControl());
  }

  removeItemAdministration(index: number) {
    this.getItemsAdministration(index).removeAt(this.getItemsAdministration(index).controls.length - 1);
  }

  addItemRepresentation(index: number) {
    this.getItemsRepresentation(index).push(new FormControl());
  }

  removeItemRepresentation(index: number) {
    this.getItemsRepresentation(index).removeAt(this.getItemsRepresentation(index).controls.length - 1);
  }

  addItemOther(index: number) {
    this.getItemsOther(index).push(new FormControl());
  }

  removeItemOther(index: number) {
    this.getItemsOther(index).removeAt(this.getItemsOther(index).controls.length - 1);
  }

  loadTeacherActivities() {
    this.caiRequest.asignaturas = [];
    for(let i = 0; i < this.elementsDataTeacherActivities.length; i++) {
      let subjectSelected = parseInt(this.elementsDataTeacherActivities[i].subject);
      if(this.caiRequest.asignaturas.includes(subjectSelected)) {
        this.openDialog('No puede seleccionar dos asignaturas iguales', '');
      } else {
        this.caiRequest.asignaturas.push(subjectSelected);
      }
    }
  }

  loadInvestigationActivities() {
    this.caiRequest.investigacion = [];
    let item;
    for(let i = 0; i < this.elementsDataInvestigationActivities.length; i++) {
      item = this.investigationActivitiesForm.get('investigationActivity' + i)?.value;
      if(item != '') {
        if(item < 0) {
          return this.validHours = false;
        }
        if(item > 0) {
          this.caiRequest.investigacion.push({
            id: this.elementsDataInvestigationActivities[i].id,
            horas: item,
          });
        }
      }
    }
    return true;
  }

  loadExtensionActivities() {
    this.caiRequest.extension = [];
    let itemsExtension = '';
    for(let i = 0; i < this.elementsDataExtensionActivities.length; i++) {
      if(this.extensionActivities.controls[i].get('hours')?.value < 0) {
        return this.validHours = false;
      }
      if(this.elementsDataExtensionActivities[i].listar) {
        for(let j = 0; j < this.getItemsExtension(i).controls.length; j++) {
          if(j != 0) {
            itemsExtension += ',';
          }
          itemsExtension += this.getItemsExtension(i).controls[j].value;
        }
      }
      if(this.extensionActivities.controls[i].get('hours')?.value > 0 || itemsExtension !== '') {
        this.caiRequest.extension.push({
          id: this.elementsDataExtensionActivities[i].id,
          horas: this.extensionActivities.controls[i].get('hours')?.value,
          nombre: itemsExtension
        });
      }
    }
    return true;
  }

  loadAdministrationActivities() {
    this.caiRequest.administracion = [];
    let itemsAdministration = '';
    for(let i = 0; i < this.elementsDataAdministrationActivities.length; i++) {
      if(this.administrationActivities.controls[i].get('hours')?.value < 0) {
        return this.validHours = false;
      }
      if(this.elementsDataAdministrationActivities[i].listar) {
        for(let j = 0; j < this.getItemsAdministration(i).controls.length; j++) {
          if(j != 0) {
            itemsAdministration += ',';
          }
          itemsAdministration += this.getItemsAdministration(i).controls[j].value;
        }
      }
      if(this.administrationActivities.controls[i].get('hours')?.value > 0 || itemsAdministration !== '') {
        this.caiRequest.administracion.push({
          id: this.elementsDataAdministrationActivities[i].id,
          horas: this.administrationActivities.controls[i].get('hours')?.value,
          nombre: itemsAdministration
        });
      }
    }
    return true;
  }

  loadRepresentationActivities() {
    this.caiRequest.representaciones = [];
    let itemsRepresentation = '';
    for(let i = 0; i < this.elementsDataRepresentationActivities.length; i++) {
      if(this.representationActivities.controls[i].get('hours')?.value < 0) {
        return this.validHours = false;
      }
      if(this.elementsDataRepresentationActivities[i].listar) {
        for(let j = 0; j < this.getItemsRepresentation(i).controls.length; j++) {
          if(j != 0) {
            itemsRepresentation += ',';
          }
          itemsRepresentation += this.getItemsRepresentation(i).controls[j].value;
        }
      }
      if(this.representationActivities.controls[i].get('hours')?.value > 0 || itemsRepresentation !== '') {
        this.caiRequest.representaciones.push({
          id: this.elementsDataRepresentationActivities[i].id,
          horas: this.representationActivities.controls[i].get('hours')?.value,
          nombre: itemsRepresentation
        });
      }
    }
    return true;
  }

  loadOtherActivities() {
    this.caiRequest.otras = [];
    let itemsOther = '';
    for(let i = 0; i < this.elementsDataOtherActivities.length; i++) {
      if(this.otherActivities.controls[i].get('hours')?.value < 0) {
        return this.validHours = false;
      }
      if(this.elementsDataOtherActivities[i].listar) {
        for(let j = 0; j < this.getItemsOther(i).controls.length; j++) {
          if(j != 0) {
            itemsOther += ',';
          }
          itemsOther += this.getItemsOther(i).controls[j].value;
        }
      }
      if(this.otherActivities.controls[i].get('hours')?.value > 0 || itemsOther !== '') {
        this.caiRequest.otras.push({
          id: this.elementsDataOtherActivities[i].id,
          horas: this.otherActivities.controls[i].get('hours')?.value,
          nombre: itemsOther
        });
      }
    }
    return true;
  }

  getHoursTeacherActivities() {
    this.totalHours.totalTeacherActivities = 0;
    for(let i = 0; i < this.elementsDataTeacherActivities.length; i++) {
      this.totalHours.totalTeacherActivities += this.elementsDataTeacherActivities[i].theoreticalHours +
      this.elementsDataTeacherActivities[i].practicalHours;
    }
  }

  getSubtotalTeacherActivities() {
    let totalTeacherActivities = this.totalHours.totalTeacherActivities;
    this.totalHours.subtotalTeacherActivities = (totalTeacherActivities) + (totalTeacherActivities * 0.75) + ((totalTeacherActivities * 0.3) * 2);
    this.getTotalHoursCai(false);
    return this.totalHours.subtotalTeacherActivities;
  }

  getSubtotalInvestigationActivities() {
    this.totalHours.subtotalInvestigationActivities = 0;
    let item;
    for(let i = 0; i < this.elementsDataInvestigationActivities.length; i++) {
      item = this.investigationActivitiesForm.get('investigationActivity' + i)?.value
      if(item !== '' && item >= 0) {
        this.totalHours.subtotalInvestigationActivities += item;
      }
    }
    this.getTotalHoursCai(false);
    return this.totalHours.subtotalInvestigationActivities.toFixed(1);
  }

  getSubtotalExtensionActivities() {
    this.totalHours.subtotalExtensionActivities = 0;
    let item;
    for(let i = 0; i < this.elementsDataExtensionActivities.length; i++) {
      item = this.extensionActivities.controls[i].get('hours')?.value;
      if(item !== null && item >= 0){
        this.totalHours.subtotalExtensionActivities += item;
      }
    }
    this.getTotalHoursCai(false);
    return this.totalHours.subtotalExtensionActivities.toFixed(1);
  }

  getSubtotalAdministrationActivities() {
    this.totalHours.subtotalAdministrationActivities = 0;
    let item;
    for(let i = 0; i < this.elementsDataAdministrationActivities.length; i++) {
      item = this.administrationActivities.controls[i].get('hours')?.value;
      if(item !== null && item >= 0) {
        this.totalHours.subtotalAdministrationActivities += item;
      }
    }
    return this.totalHours.subtotalAdministrationActivities.toFixed(1);
  }

  getSubtotalRepresentationActivities() {
    this.totalHours.subtotalRepresentationActivities = 0;
    let item;
    for(let i = 0; i < this.elementsDataRepresentationActivities.length; i++) {
      item = this.representationActivities.controls[i].get('hours')?.value;
      if(item !== null && item >= 0) {
        this.totalHours.subtotalRepresentationActivities += item;
      }
    }
    this.getTotalHoursCai(false);
    return this.totalHours.subtotalRepresentationActivities.toFixed(1);
  }

  getSubtotalOtherActivities() {
    this.totalHours.subtotalOtherActivities = 0;
    let item;
    for(let i = 0; i < this.elementsDataOtherActivities.length; i++) {
      item = this.otherActivities.controls[i].get('hours')?.value;
      if(item !== null && item >= 0) {
        this.totalHours.subtotalOtherActivities += item;
      }
    }
    this.getTotalHoursCai(false);
    return this.totalHours.subtotalOtherActivities.toFixed(1);
  }

  getTotalHoursCai(isTotal: boolean) {
    if(!isTotal) {
      this.getSubtotalAdministrationActivities();
    }

    this.totalHours.totalCai = this.totalHours.subtotalTeacherActivities + this.totalHours.subtotalInvestigationActivities +
    this.totalHours.subtotalExtensionActivities + this.totalHours.subtotalAdministrationActivities +
    this.totalHours.subtotalRepresentationActivities + this.totalHours.subtotalOtherActivities;
    return this.totalHours.totalCai.toFixed(1);
  }

  loadDataCai() {
    this.caiRequest.dedicacion = this.getDataItemForm('dedication');
    this.caiRequest.observaciones = this.getDataItemForm('observations');
    this.caiRequest.id_firma = this.idSignature;
  }

  getDataItemForm(name: string) {
    return this.caiForm.get(name)?.value;
  }

  validationRedirect(error: HttpErrorResponse, baseRoute: string) {
    if(error.status === 401) {
      sessionStorage.clear();
      baseRoute = '/login';
    }
    return baseRoute;
  }

  formatText(text: string) {
    text = text.toLowerCase();
    return text[0].toUpperCase() + text.slice(1);
  }

  openDialog(description: string, routeRedirect: string) {
    this.dialog.open(InformativeDialogComponent, {
      data: {
        description,
        routeRedirect
      },
      disableClose: true
    });
  }

  addSignature() {
    this.dialog.open(AddSignatureComponent);
  }

}
