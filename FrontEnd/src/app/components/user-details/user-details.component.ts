import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentModel } from 'src/app/models/DepartmentModel';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() userModel: UserModel;
  @Input() isEditable: boolean;
  @Input() onlyViewDirector: boolean;
  isDean: boolean;
  isAdmin: boolean;
  user: FormGroup;
  departmentList: DepartmentModel[];

  constructor() {
    this.userModel = {
      name: '', lastName: '', code: '', department: '', faculty: '', email: '',
      hasCAI: false, role: [''], signature: ''
    };
    this.isDean = false;
    this.isAdmin = sessionStorage.getItem('activeRole') === 'ADMIN';
    this.isEditable = false;
    this.onlyViewDirector = false;
    this.user = new FormGroup({});
    this.departmentList = [
      {id: '1', name: 'Sistemas e informática', description: 'Descripción de Sistemas e informática', director: 'Director 1'},
      {id: '2', name: 'Sistemas e informática 2', description: 'Descripción de Sistemas e informática 2', director: 'Director 2'},
    ];
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('activeRole') === 'DECANO'){
      this.isDean = true;
    }
    let activeRole = sessionStorage.getItem('activeRole');
    this.user = new FormGroup({
      nameInput: new FormControl({value: this.userModel.name, disabled: !this.isEditable}),
      lastNameInput: new FormControl({value: this.userModel.lastName, disabled: !this.isEditable}),
      codeInput: new FormControl({value: this.userModel.code, disabled: !this.isEditable}),
      emailInput: new FormControl({value: this.userModel.email, disabled: !this.isEditable}),
      departmentInput: new FormControl({value: this.userModel.department, disabled: activeRole !== 'ADMIN'}),
      facultyInput: new FormControl({value: this.userModel.faculty, disabled: true}),
      isRoleDeanInput: new FormControl({value: this.userModel.role.includes('DECANO'), disabled: true}),
      isRoleDirectorInput: new FormControl({value: this.userModel.role.includes('DIRECTOR'), disabled: true}),
      isRoleTeacherInput: new FormControl({value: this.userModel.role.includes('DOCENTE'), disabled: true}),
      signatureInput: new FormControl({value: (this.userModel.signature === '') ? 'No tiene firma' : this.userModel.signature, disabled: true}),
      signatureInputFile: new FormControl(''),
    });
  }

}
