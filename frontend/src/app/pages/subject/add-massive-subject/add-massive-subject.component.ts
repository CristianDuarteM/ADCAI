import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/services/Dialog';
import { SubjectRequest } from 'src/app/models/request/SubjectRequest';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-add-massive-subject',
  templateUrl: './add-massive-subject.component.html',
  styleUrls: ['./add-massive-subject.component.css']
})
export class AddMassiveSubjectComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  subjectForm: FormGroup;
  @ViewChild("fileLoaded", {
    read: ElementRef
  }) fileLoaded: ElementRef;
  dataFile: SubjectRequest[];
  idStudyPlan: string;

  constructor(private rolePermission: RolePermission, public dialog: Dialog, private route: ActivatedRoute,
    private subjectService: SubjectService) {
    this.idStudyPlan = this.route.snapshot.paramMap.get('idStudyPlan') || '';
    this.backRoute = '/gestion-plan-estudio/ver/' + this.idStudyPlan;
    this.title = 'Agregar Asignaturas - Masivo';
    this.isPrincipal = false;
    this.subjectForm = new FormGroup({
      selectedFile: new FormControl('', [Validators.required]),
    });
    this.fileLoaded = {} as ElementRef;
    this.dataFile = [];
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

  onSubmit() {
    if(this.subjectForm.valid) {
      this.getDataFile();
    } else {
      this.dialog.openDialog('¡Debe seleccionar un archivo!',
      '/gestion-asignaturas/agregar/masivo/plan-estudios/' + this.idStudyPlan);
    }
  }

  getDataFile() {
    let fileSelected = this.fileLoaded.nativeElement.files[0];

    if(fileSelected.type === 'text/plain') {
      let reader = new FileReader();
      reader.onloadend = () => this.addMassiveSubject(reader.result);
      reader.readAsText(fileSelected, 'ISO-8859-1');
    } else {
      this.dialog.openDialog("El tipo de archivo es incorrecto",
      '/gestion-asignaturas/agregar/masivo/plan-estudios/' + this.idStudyPlan);
    }
  }

  addMassiveSubject(content: string | ArrayBuffer | null) {
    if(typeof content === 'string') {
      content = content.replace(/\r?\n|\r/g, '');
      let dataAllSubjects = content.split(';');
      let itemData;
      let dataValid = true;
      dataAllSubjects.forEach(data => {
        itemData = data.split(',');
        if(itemData.length !== 4) {
          dataValid = false;
          return this.dialog.openDialog("Faltan campos para agregar las asignaturas",
          '/gestion-asignaturas/agregar/masivo/plan-estudios/' + this.idStudyPlan);
        }
        this.dataFile.push({
          nombre: itemData[0],
          creditos: itemData[1],
          horas_teoricas: itemData[2],
          horas_practicas: itemData[3],
          estado: true,
          id_programa: this.idStudyPlan,
        });
      });
      if(dataValid) {
        this.subjectService.addSubjectList(this.dataFile).subscribe({
          next: subjectResponse => {
            this.dialog.openDialog(subjectResponse.msg, '/gestion-plan-estudio/ver/' + this.idStudyPlan);
          },
          error: (error: HttpErrorResponse) => {
            let route = '/gestion-asignaturas/agregar/masivo/plan-estudios/' + this.idStudyPlan;
            this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError(route, error));
          }
        });
      }
    }
  }

}
