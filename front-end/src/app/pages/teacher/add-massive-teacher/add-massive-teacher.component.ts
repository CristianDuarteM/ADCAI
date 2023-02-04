import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/models/Dialog';
import { RolePermission } from 'src/app/models/RolePermission';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-massive-teacher',
  templateUrl: './add-massive-teacher.component.html',
  styleUrls: ['./add-massive-teacher.component.css']
})
export class AddMassiveTeacherComponent implements OnInit {

  backRouteTeacher: string;
  titleTeacher: string;
  isPrincipalTeacher: boolean;
  teacher: FormGroup;
  @ViewChild("fileLoaded", {
    read: ElementRef
  }) fileLoaded: ElementRef;
  dataFile: string[];

  constructor(private rolePermission: RolePermission, private route: ActivatedRoute, public dialog: Dialog,
    private userService: UserService) {
    let idFaculty = this.route.snapshot.paramMap.get('idFaculty') || '';
    let idDepartment = this.route.snapshot.paramMap.get('idDepartment') || '';
    this.backRouteTeacher = '/gestion-docentes/agregar/facultad/' + idFaculty + '/departamento/' + idDepartment;
    this.titleTeacher = 'Agregar Docentes - Masivo';
    this.isPrincipalTeacher = false;
    this.teacher = new FormGroup({
      selectedFaculty: new FormControl({value: sessionStorage.getItem('nameFaculty'), disabled: true}),
      selectedDepartment: new FormControl({value: sessionStorage.getItem('nameDepartment'), disabled: true}),
      selectedFile: new FormControl('', [Validators.required])
    });
    this.fileLoaded = {} as ElementRef;
    this.dataFile = [];
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

  onSubmit() {
    if(this.teacher.valid) {
      this.getDataFile();
    } else{
      let idDepartment = this.route.snapshot.paramMap.get('idDepartment');
      let idFaculty = this.route.snapshot.paramMap.get('idFaculty');
      this.dialog.openDialog('¡Debe seleccionar un archivo!',
      '/gestion-docentes/agregar/masivo/facultad/' + idFaculty + '/departamento/' + idDepartment);
    }
  }

  getDataFile() {
    let fileSelected = this.fileLoaded.nativeElement.files[0];

    if(fileSelected.type === 'text/plain') {
      let reader = new FileReader();
      reader.onloadend = () => this.addMassiveTeacher(reader.result);
      reader.readAsText(fileSelected, 'ISO-8859-1');
    } else{
      let idDepartment = this.route.snapshot.paramMap.get('idDepartment');
      let idFaculty = this.route.snapshot.paramMap.get('idFaculty');
      this.dialog.openDialog("El tipo de archivo es incorrecto",
      '/gestion-docentes/agregar/masivo/facultad/' + idFaculty + '/departamento/' + idDepartment);
    }
  }

  addMassiveTeacher(content: string | ArrayBuffer | null) {
    if(typeof content === 'string') {
      let idDepartment = this.route.snapshot.paramMap.get('idDepartment');
      let idFaculty = this.route.snapshot.paramMap.get('idFaculty');
      content = content.replace(/\s+/g, '');
      this.dataFile = content.split(',');
      this.userService.addTeacherList(this.dataFile, idDepartment || '').subscribe({
        next: userResponse => {
          this.dialog.openDialog(userResponse.msg, '/gestion-docentes');
        },
        error: (error: HttpErrorResponse) => {
          let route = '/gestion-docentes/agregar/masivo/facultad/' + idFaculty + '/departamento/' + idDepartment;
          this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError(route, error));
        }
      });
    }
  }

}
