import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
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

  constructor(private ngxPermissonsService: NgxPermissionsService, private route: ActivatedRoute, public dialog: MatDialog,
    private userService: UserService) {
    this.backRouteTeacher = '/gestion-docentes/agregar';
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
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  onSubmit() {
    if(this.teacher.valid) {
      this.getDataFile();
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
      this.openDialog("El tipo de archivo es incorrecto", '/gestion-docentes/agregar/masivo/departamento/' + idDepartment);
    }
  }

  addMassiveTeacher(content: string | ArrayBuffer | null) {
    if(typeof content === 'string') {
      let idDepartment = this.route.snapshot.paramMap.get('idDepartment');
      content = content.replace(/\s+/g, '');
      this.dataFile = content.split(',');
      this.userService.addTeacherList(this.dataFile, idDepartment || '').subscribe({
        next: userResponse => {
          this.openDialog(userResponse.msg, '/gestion-docentes');
        },
        error: (error: HttpErrorResponse) => {
          let route = '/gestion-docentes/agregar/masivo/departamento/' + idDepartment;
          if(error.status === 401) {
            sessionStorage.clear();
            route = '/login';
          }
          this.openDialog(error.error.msg, route);
        }
      });
    }
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

}
