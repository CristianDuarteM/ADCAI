import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() userModel: UserModel;
  @Input() isEditable: boolean;
  isDean: boolean;
  user: FormGroup;

  constructor() {
    this.userModel = {
      name: '', lastName: '', code: '', department: '', faculty: '', email: '',
      hasCAI: false, role: [''], signature: ''
    };
    this.isDean = false;
    this.isEditable = false;
    this.user = new FormGroup({});
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
