import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { DepartmentService } from 'src/app/services/department/department.service';
import { UserService } from 'src/app/services/user/user.service';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userModel: User;
  @Input() isEditable: boolean;
  @Input() onlyViewDirector: boolean;
  @Input() textButton: string;
  isDean: boolean;
  isAdmin: boolean;
  user: FormGroup;
  departmentList: DepartmentResponse[];
  isLoaded: boolean;
  @Input() canUpdate: boolean;

  constructor(public dialog: MatDialog, private departmentService: DepartmentService, private userService: UserService,
    private route: ActivatedRoute) {
    this.userModel = {} as User;
    this.isDean = false;
    this.isAdmin = sessionStorage.getItem('activeRole') === 'ADMIN';
    this.isEditable = false;
    this.onlyViewDirector = false;
    this.user = new FormGroup({});
    this.departmentList = [];
    this.textButton = 'Actualizar';
    this.isLoaded = false;
    this.canUpdate = false;
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('activeRole') === 'DECANO'){
      this.isDean = true;
    }

    this.user = new FormGroup({
      nameInput: new FormControl(''),
      lastNameInput: new FormControl(''),
      codeInput: new FormControl(''),
      emailInput: new FormControl(''),
      departmentInput: new FormControl(''),
      facultyInput: new FormControl(''),
      isRoleDeanInput: new FormControl(''),
      isRoleDirectorInput: new FormControl(''),
      isRoleTeacherInput: new FormControl(''),
      signatureInput: new FormControl(),
      signatureInputFile: new FormControl(''),
    });

    this.getDataUser();
  }

  onSubmit() {
    if(this.textButton === 'Actualizar') {
      this.updateUser();
    }
  }

  updateUser() {
    this.userModel = {
      ...this.userModel,
      nombre: this.getItemValue('nameInput'),
      apellido: this.getItemValue('lastNameInput'),
      codigo: this.getItemValue('codeInput'),
      correo: this.getItemValue('emailInput'),
      id_departamento: this.getItemValue('departmentInput'),
    }
    this.userService.updateUser(this.userModel.id + '', this.userModel).subscribe({
      next: userUpdateResponse => {
        this.openDialog(userUpdateResponse.msg, '/gestion-docentes/buscados/editar/' + this.userModel.id);
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error));
      }
    });
  }

  containsRole(roleList: Role[], roleUser: string) {
    let haveRole = false;
    if(roleList !== undefined && roleList.length > 0) {
      roleList.forEach(role => {
        if(role !== null && role.nombre === roleUser) {
          haveRole = true;
        }
      });
    }
    return haveRole;
  }

  getDataUser() {
    let idTeacher = this.route.snapshot.paramMap.get('idTeacher');
    this.userService.getUserById(idTeacher +'').subscribe({
      next: userResponse => {
        this.userModel = userResponse.usuario;
        this.getDepartmentList();
      },
      error: (error: HttpErrorResponse) => {
        let route = '/gestion-docentes';
        if(error.status === 401) {
          sessionStorage.clear();
          route = '/login';
        }
        this.openDialog(error.error.msg, route);
      }
    });
  }

  getDepartmentList() {
    this.departmentService.getDepartmentListByFaculty(this.userModel.id_departamento + '').subscribe({
      next: departmentListResponse => {
        this.departmentList =  departmentListResponse;
        this.loadInputs();
      },
      error: (error: HttpErrorResponse) => {
        this.openDialog(error.error.msg, this.validationRedirect(error));
      }
    });
  }

  loadInputs() {
    let activeRole = sessionStorage.getItem('activeRole');
    this.user = new FormGroup({
      nameInput: new FormControl({value: this.userModel.nombre, disabled: !this.isEditable}, [Validators.required]),
      lastNameInput: new FormControl({value: this.userModel.apellido, disabled: !this.isEditable}, [Validators.required]),
      codeInput: new FormControl({value: this.userModel.codigo, disabled: !this.isEditable}, [Validators.required]),
      emailInput: new FormControl({value: this.userModel.correo, disabled: true}, [Validators.required, Validators.email]),
      departmentInput: new FormControl({value: this.userModel.id_departamento, disabled: activeRole !== 'ADMIN'}),
      facultyInput: new FormControl({value: '', disabled: true}),
      isRoleDeanInput: new FormControl({value: this.containsRole(this.userModel.rols, 'DECANO'), disabled: true}),
      isRoleDirectorInput: new FormControl({value: this.containsRole(this.userModel.rols, 'DIRECTOR'), disabled: true}),
      isRoleTeacherInput: new FormControl({value: this.containsRole(this.userModel.rols, 'DOCENTE'), disabled: true}),
      signatureInput: new FormControl({value: 'this.userModel.signature', disabled: true}),
      signatureInputFile: new FormControl(''),
    });
    this.isLoaded = true;
  }

  validationRedirect(error: HttpErrorResponse) {
    let route = '/gestion-docentes';
    if(error.status === 401) {
      sessionStorage.clear();
      route = '/login';
    }
    return route;
  }

  getItemValue(name: string) {
    return this.user.get(name)?.value;
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
