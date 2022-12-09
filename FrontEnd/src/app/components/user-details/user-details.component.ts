import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentModel } from 'src/app/models/DepartmentModel';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { InformativeDialogComponent } from '../informative-dialog/informative-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() userModel: User;
  @Input() isEditable: boolean;
  @Input() onlyViewDirector: boolean;
  @Input() textButton: string;
  isDean: boolean;
  isAdmin: boolean;
  user: FormGroup;
  departmentList: DepartmentModel[];

  constructor(public dialog: MatDialog) {
    this.userModel = {} as User;
    this.isDean = false;
    this.isAdmin = sessionStorage.getItem('activeRole') === 'ADMIN';
    this.isEditable = false;
    this.onlyViewDirector = false;
    this.user = new FormGroup({});
    this.departmentList = [
      {id: '1', name: 'Sistemas e informática', description: 'Descripción de Sistemas e informática', director: 'Director 1'},
      {id: '2', name: 'Sistemas e informática 2', description: 'Descripción de Sistemas e informática 2', director: 'Director 2'},
    ];
    this.textButton = 'Actualizar';
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('activeRole') === 'DECANO'){
      this.isDean = true;
    }
    let activeRole = sessionStorage.getItem('activeRole');
    this.user = new FormGroup({
      nameInput: new FormControl({value: this.userModel.nombre, disabled: !this.isEditable}, [Validators.required]),
      lastNameInput: new FormControl({value: this.userModel.apellido, disabled: !this.isEditable}, [Validators.required]),
      codeInput: new FormControl({value: this.userModel.codigo, disabled: !this.isEditable}, [Validators.required]),
      emailInput: new FormControl({value: this.userModel.correo, disabled: !this.isEditable}, [Validators.required, Validators.email]),
      departmentInput: new FormControl({value: this.userModel.id_departamento, disabled: activeRole !== 'ADMIN'}),
      facultyInput: new FormControl({value: '', disabled: true}),
      isRoleDeanInput: new FormControl({value: this.containsRole(this.userModel.rols, 'DECANO'), disabled: true}),
      isRoleDirectorInput: new FormControl({value: this.containsRole(this.userModel.rols, 'DIRECTOR'), disabled: true}),
      isRoleTeacherInput: new FormControl({value: this.containsRole(this.userModel.rols, 'DOCENTE'), disabled: true}),
      signatureInput: new FormControl({value: 'this.userModel.signature', disabled: true}),
      signatureInputFile: new FormControl(''),
    });
  }

  onSubmit() {
    if(this.textButton === 'Actualizar') {

    }
  }

  containsRole(roleList: Role[], roleUser: string) {
    roleList.forEach(role => { return role.nombre === roleUser});
    return false;
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
