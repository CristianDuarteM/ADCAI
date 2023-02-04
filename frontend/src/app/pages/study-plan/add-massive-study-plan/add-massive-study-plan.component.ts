import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { RolePermission } from 'src/app/models/RolePermission';
import { StudyPlanService } from 'src/app/services/studyPlan/study-plan.service';

@Component({
  selector: 'app-add-massive-study-plan',
  templateUrl: './add-massive-study-plan.component.html',
  styleUrls: ['./add-massive-study-plan.component.css']
})
export class AddMassiveStudyPlanComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  studyPlanForm: FormGroup;
  @ViewChild("fileLoaded", {
    read: ElementRef
  }) fileLoaded: ElementRef;
  dataFile: string[];
  idFaculty: string;

  constructor(private rolePermission: RolePermission, public dialog: Dialog, private route: ActivatedRoute,
    private studyPlanService: StudyPlanService) {
    this.backRoute = '/gestion-plan-estudio/agregar';
    this.title = 'Agregar Plan de Estudios - Masivo';
    this.isPrincipal = false;
    this.studyPlanForm = new FormGroup({
      selectedFile: new FormControl('', [Validators.required]),
    });
    this.fileLoaded = {} as ElementRef;
    this.dataFile = [];
    this.idFaculty = this.route.snapshot.paramMap.get('idFaculty') || '';
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

  onSubmit() {
    if(this.studyPlanForm.valid) {
      this.getDataFile();
    } else {
      this.dialog.openDialog('¡Debe seleccionar un archivo!',
      '/gestion-plan-estudio/agregar/masivo/facultad/' + this.idFaculty);
    }
  }

  getDataFile() {
    let fileSelected = this.fileLoaded.nativeElement.files[0];

    if(fileSelected.type === 'text/plain') {
      let reader = new FileReader();
      reader.onloadend = () => this.addMassiveStudyPlan(reader.result);
      reader.readAsText(fileSelected, 'ISO-8859-1');
    } else {
      this.dialog.openDialog("El tipo de archivo es incorrecto",
      '/gestion-plan-estudio/agregar/masivo/facultad/' + this.idFaculty);
    }
  }

  addMassiveStudyPlan(content: string | ArrayBuffer | null) {
    if(typeof content === 'string') {
      this.dataFile = content.split(',');
      this.studyPlanService.addStudyPlanList(this.dataFile, this.idFaculty).subscribe({
        next: studyPlanResponse => {
          this.dialog.openDialog(studyPlanResponse.msg, '/gestion-plan-estudio');
        },
        error: (error: HttpErrorResponse) => {
          let route = '/gestion-plan-estudio/agregar/masivo/facultad/' + this.idFaculty;
          this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError(route, error));
        }
      });
    }
  }

}
