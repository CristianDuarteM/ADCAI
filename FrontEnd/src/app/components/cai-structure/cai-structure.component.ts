import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
import { AdministrationActivities } from 'src/app/models/AdministrationActivities';
import { RepresentationActivities } from 'src/app/models/RepresentationActivities';
import { OtherActivities } from 'src/app/models/OtherActivities';
import { UserService } from 'src/app/services/user/user.service';
import { config } from 'src/app/constants/config';
import { DepartmentService } from 'src/app/services/department/department.service';
import { AddSignatureComponent } from 'src/app/pages/user/add-signature/add-signature.component';
import { Cai } from 'src/app/models/Cai';
import { Feedback } from 'src/app/models/Feedback';
import { Dialog } from 'src/app/models/Dialog';
import { Note } from 'src/app/models/Note';

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
  elementsDataNotes: Note[];
  dataArrayTeacherActivities: MatTableDataSource<TeacherActivitiesTable>;
  dataArrayInvestigationActivities: MatTableDataSource<InvestigationActivitiesTable>;
  @ViewChild('tableTeacherActivities') table: MatTable<any> | undefined;
  indexStudyPlan: string;
  totalHours: TotalHours;
  idSignature: string;
  validHours: boolean;
  @Input() isViewCai: boolean;
  @Input() dataCai: Cai;
  @Input() loadedData: boolean;
  loadActivities: number;
  @Input() feedbackList: Feedback[];

  constructor(private caiService: CaiService, public dialog: Dialog, private fb: FormBuilder, private userService: UserService,
    private departmentService: DepartmentService, private generalDialog: MatDialog) {
    this.caiRequest = new CaiRequest();
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
    this.elementsDataNotes = [];
    this.dataArrayTeacherActivities = new MatTableDataSource(undefined);
    this.dataArrayInvestigationActivities = new MatTableDataSource(undefined);
    this.table = undefined;
    this.indexStudyPlan = '';
    this.totalHours = new TotalHours();
    this.idSignature = '';
    this.validHours = true;
    this.isViewCai = false;
    this.dataCai = new Cai();
    this.loadedData = false;
    this.loadActivities = 0;
    this.feedbackList = [];
  }

  ngOnInit(): void {
    this.inicializeCaiForm();
    this.studyPlanForm = Object.assign(new FormGroup({}), this.caiForm.get('studyPlan'));
    this.subjectForm = Object.assign(new FormGroup({}), this.caiForm.get('subject'));
    this.investigationActivitiesForm = Object.assign(new FormGroup({}), this.caiForm.get('investigationActivities'));
    this.getStudyPlan();
    this.inicializeDataNotes();
    if(this.loadedData) {
      this.getDataCaiLoaded();
      this.inicializeDataInvestigationActivitiesWithData();
      this.inicializeDataExtensionActivitiesWithData();
      this.inicializeDataAdministrationActivitiesWithData();
      this.inicializeDataRepresentationActivitiesWithData();
      this.inicializeDataOtherActivitiesWithData();
    } else {
      this.dataCai = new Cai();
      this.getDataUser();
      this.inicializeDataInvestigationActivities();
      this.inicializeDataExtensionActivities();
      this.inicializeDataAdministrationActivities();
      this.inicializeDataRepresentationActivities();
      this.inicializeDataOtherActivities();
    }
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
        return this.dialog.openDialog('¡¡No se aceptan números negativos!!', '');
      }
      this.loadDataCai();
      if(this.loadedData) {
        this.updateCai();
      } else {
        this.addCai();
      }
    } else {
      console.log(this.caiForm);
      this.dialog.openDialog('¡¡Faltan campos por diligenciar!!', '');
    }
  }

  addCai() {
    if(this.idSignature === ''){
      if(sessionStorage.getItem('idSignature') !== null) {
        this.idSignature = sessionStorage.getItem('idSignature') || '';
      } else {
        return this.addSignature();
      }
    }
    this.fillCai();
  }

  updateCai() {
    this.caiService.updateCai(this.dataCai.id, this.caiRequest).subscribe({
      next: updateCaiResponse => {
        this.dialog.openDialog(updateCaiResponse.msg, '/home');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

  fillCai() {
    this.caiService.fillCai(this.caiRequest).subscribe({
      next: caiServiceResponse => {
        this.dialog.openDialog(caiServiceResponse.msg, '/home');
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('', error));
      }
    });
  }

  getDataUser() {
    this.userService.getUserById(sessionStorage.getItem(config.SESSION_STORAGE.ID_USER) || '').subscribe({
      next: userServiceResponse => {
        if(userServiceResponse.usuario.id_departamento === null) {
          return this.dialog.openDialog('No se encuentra asociado a algún departamento', '/home');
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
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/diligenciar-cai', error));
      }
    });
  }

  getDataCaiLoaded() {
    this.caiForm.setControl('department', new FormControl({value: this.dataCai.usuario.departamento.nombre, disabled: true}, [Validators.required]));
    this.caiForm.setControl('semester', new FormControl({value: (this.dataCai.periodo.semestre === 2) ? 'II' : 'I', disabled: true}, [Validators.required]));
    this.caiForm.setControl('teacher', new FormControl({value: this.dataCai.usuario.nombre + ' ' + this.dataCai.usuario.apellido, disabled: true}, [Validators.required]));
    this.caiForm.setControl('code', new FormControl({value: this.dataCai.usuario.codigo, disabled: true}, [Validators.required]));
    this.caiForm.setControl('dedication', new FormControl({value: this.dataCai.dedicacion, disabled: this.isViewCai}, [Validators.required]));
    this.caiForm.setControl('observations', new FormControl({value: this.dataCai.observacion, disabled: this.isViewCai}));
  }

  getDepartment(idDepartment: string) {
    this.departmentService.getDepartmentById(idDepartment).subscribe({
      next: departmentResponse => {
        this.caiForm.setControl('department', new FormControl({value: departmentResponse.nombre, disabled: true}, [Validators.required]));
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
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
    this.caiService.getStudyPlanListWithFilter('si').subscribe({
      next: studyPlanListServiceResponse => {
        this.studyPlanList = studyPlanListServiceResponse.rows;
        this.inicializeTeacherActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  loadSubjectList(idStudyPlan: string) {
    let idTable = idStudyPlan.split('-');
    if(idTable[1] !== '0' && idTable[1] !== '') {
      this.caiService.getSubjectListByStudyPlan(idTable[1], 'si').subscribe({
        next: subjectListResponse => {
          let index = idTable[0].length - 1;
          this.indexStudyPlan = idTable[0][index];
          this.elementsDataTeacherActivities[parseInt(this.indexStudyPlan)].plan_estudio.id = idTable[1];
          this.elementsDataTeacherActivities[parseInt(this.indexStudyPlan)].subjectList = subjectListResponse;
        },
        error: (error: HttpErrorResponse) => {
          this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
        }
      });
    }
  }

  loadSubjectData(idSubject: string) {
    let idTable = idSubject.split('-');
    if(idTable[1] !== '0' && idTable[1] !== '') {
      this.caiService.getSubjectListById(idTable[1]).subscribe({
        next: subjectResponse => {
          let index: number = idTable[0].length - 1;
          index = parseInt(idTable[0][index]);
          this.elementsDataTeacherActivities[index].id = idTable[1];
          this.elementsDataTeacherActivities[index].creditos = subjectResponse.creditos;
          this.elementsDataTeacherActivities[index].horas_teoricas = subjectResponse.horas_teoricas;
          this.elementsDataTeacherActivities[index].horas_practicas = subjectResponse.horas_practicas;
          this.getHoursTeacherActivities();
        },
        error: (error: HttpErrorResponse) => {
          this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/diligenciar-cai', error));
        }
      });
    }
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
      dedication: new FormControl({value: '', disabled: this.isViewCai}, [Validators.required]),
      studyPlan: new FormGroup({}),
      subject: new FormGroup({}),
      investigationActivities: new FormGroup({}),
      extensionActivities: this.fb.array([]),
      administrationActivities: this.fb.array([]),
      representationActivities: this.fb.array([]),
      otherActivities: this.fb.array([]),
      observations: new FormControl({value: '', disabled: this.isViewCai}),
      signature: new FormControl('true', [Validators.required]),
    });
  }

  inicializeTeacherActivitiesForm() {
    if(this.loadedData) {
      this.elementsDataTeacherActivities = this.dataCai.asignaturas;
    } else {
      this.elementsDataTeacherActivities = [new TeacherActivitiesTable()];
    }

    for(let i = 0; i < this.elementsDataTeacherActivities.length; i++) {
      this.studyPlanForm.addControl('studyPlan'+ i, new FormControl({
          value: (this.elementsDataTeacherActivities[i].plan_estudio !== undefined) ? ('studyPlan' + i + '-' + this.elementsDataTeacherActivities[i].plan_estudio.id) : '0',
          disabled: this.isViewCai
        },
        [Validators.required]
      ));
      this.subjectForm.addControl('subject' + i, new FormControl({
          value: 'subject' + i + '-' + (this.elementsDataTeacherActivities[i].id || '0'),
          disabled: this.isViewCai
        },
        [Validators.required]
      ));
      this.loadSubjectList('studyPlan' + i + '-' + this.elementsDataTeacherActivities[i].plan_estudio.id);
      this.loadSubjectData('subject' + i + '-' + this.elementsDataTeacherActivities[i].id);
      this.elementsDataTeacherActivities[i].nameFormStudyPlan = 'studyPlan' + i;
      this.elementsDataTeacherActivities[i].nameFormSubject = 'subject' + i;
    }
    this.dataArrayTeacherActivities = new MatTableDataSource(this.elementsDataTeacherActivities);
    this.loadActivities++;
  }

  inicializeInvestigationActivitiesForm() {
    for(let i = 0; i < this.elementsDataInvestigationActivities.length; i++) {
      this.investigationActivitiesForm.addControl('investigationActivity' + i, new FormControl({value: 0, disabled: this.isViewCai}));
      this.elementsDataInvestigationActivities[i].nombreFormInput = 'investigationActivity' + i;
    }
    this.dataArrayInvestigationActivities = new MatTableDataSource(this.elementsDataInvestigationActivities);
    this.loadActivities++;
  }

  inicializeExtensionActivitiesForm() {
    for(let i = 0; i < this.elementsDataExtensionActivities.length; i++) {
      this.extensionActivities.push(this.fb.group({
        hours: new FormControl({value: 0, disabled: this.isViewCai}),
        itemsExtension: this.fb.array([]),
      }));
    }
    this.loadActivities++;
  }

  inicializeAdministrationActivitiesForm() {
    for(let i = 0; i < this.elementsDataAdministrationActivities.length; i++) {
      this.administrationActivities.push(this.fb.group({
        hours: new FormControl({value: 0, disabled: this.isViewCai}),
        itemsAdministration: this.fb.array([]),
      }));
    }
    this.loadActivities++;
  }

  inicializeRepresentationActivitiesForm() {
    for(let i = 0; i < this.elementsDataRepresentationActivities.length; i++) {
      this.representationActivities.push(this.fb.group({
        hours: new FormControl({value: 0, disabled: this.isViewCai}),
        itemsRepresentation: this.fb.array([]),
      }));
    }
    this.loadActivities++;
  }

  inicializeOtherActivitiesForm() {
    for(let i = 0; i < this.elementsDataOtherActivities.length; i++) {
      this.otherActivities.push(this.fb.group({
        hours: new FormControl({value: 0, disabled: this.isViewCai}),
        itemsOther: this.fb.array([]),
      }));
    }
    this.loadActivities++;
  }

  inicializeDataInvestigationActivities() {
    this.caiService.getInvestigationActivityListWithFilter('si').subscribe({
      next: investigationActivitiesResponse => {
        this.elementsDataInvestigationActivities = investigationActivitiesResponse;
        this.inicializeInvestigationActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  inicializeDataInvestigationActivitiesWithData() {
    this.elementsDataInvestigationActivities = this.dataCai.actividad_investigacions;
    for(let i = 0; i < this.dataCai.actividad_investigacions.length; i++) {
      this.investigationActivitiesForm.addControl('investigationActivity' + i, new FormControl({
        value: this.dataCai.actividad_investigacions[i].periodo_docente_actividad_investigacion.horas,
        disabled: this.isViewCai
      }));
      this.elementsDataInvestigationActivities[i].nombreFormInput = 'investigationActivity' + i;
    }
    this.dataArrayInvestigationActivities = new MatTableDataSource(this.elementsDataInvestigationActivities);
    this.loadActivities++;
  }

  inicializeDataExtensionActivities() {
    this.caiService.getExtensionActivityListWithFilter('si').subscribe({
      next: extensionActivitiesResponse => {
        this.elementsDataExtensionActivities = extensionActivitiesResponse.rows;
        this.inicializeExtensionActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  inicializeDataExtensionActivitiesWithData() {
    this.elementsDataExtensionActivities = this.dataCai.actividad_extensions;
    for(let i = 0; i < this.dataCai.actividad_extensions.length; i++) {
      this.extensionActivities.push(this.fb.group({
        hours: new FormControl({
          value: this.dataCai.actividad_extensions[i].periodo_docente_actividad_extension.horas,
          disabled: this.isViewCai
        }),
        itemsExtension: this.fb.array(this.getListItems(this.dataCai.actividad_extensions[i].periodo_docente_actividad_extension.nombre)),
      }));
    }
    this.loadActivities++;
  }

  inicializeDataAdministrationActivities() {
    this.caiService.getAdministrationActivityListWithFilter('si').subscribe({
      next: administrationActivitiesResponse => {
        this.elementsDataAdministrationActivities = administrationActivitiesResponse;
        this.inicializeAdministrationActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  inicializeDataAdministrationActivitiesWithData() {
    this.elementsDataAdministrationActivities = this.dataCai.actividad_administracions;
    for(let i = 0; i < this.dataCai.actividad_administracions.length; i++) {
      this.administrationActivities.push(this.fb.group({
        hours: new FormControl({
          value: this.dataCai.actividad_administracions[i].periodo_docente_actividad_administracion.horas,
          disabled: this.isViewCai
        }),
        itemsAdministration: this.fb.array(this.getListItems(this.dataCai.actividad_administracions[i].periodo_docente_actividad_administracion.nombre)),
      }));
    }
    this.loadActivities++;
  }

  inicializeDataRepresentationActivities() {
    this.caiService.getRepresentationActivityListWithFilter('si').subscribe({
      next: representationActivitiesResponse => {
        this.elementsDataRepresentationActivities = representationActivitiesResponse;
        this.inicializeRepresentationActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  inicializeDataRepresentationActivitiesWithData() {
    this.elementsDataRepresentationActivities = this.dataCai.tipo_representacions;
    for(let i = 0; i < this.dataCai.tipo_representacions.length; i++) {
      this.representationActivities.push(this.fb.group({
        hours: new FormControl({
          value: this.dataCai.tipo_representacions[i].periodo_docente_representacion.horas,
          disabled: this.isViewCai
        }),
        itemsRepresentation: this.fb.array(this.getListItems(this.dataCai.tipo_representacions[i].periodo_docente_representacion.nombre)),
      }));
    }
    this.loadActivities++;
  }

  inicializeDataOtherActivities() {
    this.caiService.getOtherActivityListWithFilter('si').subscribe({
      next: otherActivitiesResponse => {
        this.elementsDataOtherActivities = otherActivitiesResponse;
        this.inicializeOtherActivitiesForm();
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  inicializeDataOtherActivitiesWithData() {
    this.elementsDataOtherActivities = this.dataCai.actividad_otras;
    for(let i = 0; i < this.dataCai.actividad_otras.length; i++) {
      this.otherActivities.push(this.fb.group({
        hours: new FormControl({
          value: this.dataCai.actividad_otras[i].periodo_docente_otra.horas,
          disabled: this.isViewCai
        }),
        itemsOther: this.fb.array(this.getListItems(this.dataCai.actividad_otras[i].periodo_docente_otra.nombre)),
      }));
    }
    this.loadActivities++;
  }

  inicializeDataNotes() {
    this.caiService.getNoteListWithFilter('si').subscribe({
      next: notesResponse => {
        this.elementsDataNotes = notesResponse;
        this.loadActivities++;
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  addRowTeacherActivities() {
    this.elementsDataTeacherActivities.push(new TeacherActivitiesTable());
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
    this.totalHours.totalTeacherActivities -= this.elementsDataTeacherActivities[index].horas_teoricas -
    this.elementsDataTeacherActivities[index].horas_practicas;
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
      let subjectSelected = parseInt(this.elementsDataTeacherActivities[i].id);
      if(this.caiRequest.asignaturas.includes(subjectSelected)) {
        this.dialog.openDialog('No puede seleccionar dos asignaturas iguales', '');
      } else {
        this.caiRequest.asignaturas.push(subjectSelected);
      }
    }
  }

  loadInvestigationActivities() {
    this.caiRequest.investigacion = [];
    let item: number;
    for(let i = 0; i < this.elementsDataInvestigationActivities.length; i++) {
      item = this.investigationActivitiesForm.get('investigationActivity' + i)?.value || 0;
      if(item < 0) {
        return this.validHours = false;
      }
      this.caiRequest.investigacion.push({
        id: this.elementsDataInvestigationActivities[i].id,
        horas: item,
      });
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
      this.caiRequest.extension.push({
        id: this.elementsDataExtensionActivities[i].id,
        horas: this.extensionActivities.controls[i].get('hours')?.value,
        nombre: itemsExtension
      });
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
      this.caiRequest.administracion.push({
        id: this.elementsDataAdministrationActivities[i].id,
        horas: this.administrationActivities.controls[i].get('hours')?.value,
        nombre: itemsAdministration
      });
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
      this.caiRequest.representaciones.push({
        id: this.elementsDataRepresentationActivities[i].id,
        horas: this.representationActivities.controls[i].get('hours')?.value,
        nombre: itemsRepresentation
      });
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
      this.caiRequest.otras.push({
        id: this.elementsDataOtherActivities[i].id,
        horas: this.otherActivities.controls[i].get('hours')?.value,
        nombre: itemsOther
      });
    }
    return true;
  }

  getHoursTeacherActivities() {
    this.totalHours.totalTeacherActivities = 0;
    for(let i = 0; i < this.elementsDataTeacherActivities.length; i++) {
      this.totalHours.totalTeacherActivities += this.elementsDataTeacherActivities[i].horas_teoricas +
      this.elementsDataTeacherActivities[i].horas_practicas;
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

  getListItems(itemsText: string) {
    let items = itemsText.split(',');
    let formsControl: FormControl[] = [];
    for(let i = 0; i < items.length; i++) {
      formsControl.push(
        new FormControl({value: items[i], disabled: this.isViewCai})
      );
    }
    return formsControl;
  }

  formatText(text: string) {
    text = text.toLowerCase();
    return text[0].toUpperCase() + text.slice(1);
  }

  addSignature() {
    this.generalDialog.open(AddSignatureComponent);
  }

}
