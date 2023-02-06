import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'src/app/services/Dialog';
import { RolePermission } from 'src/app/services/RolePermission';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-manual-teacher',
  templateUrl: './add-manual-teacher.component.html',
  styleUrls: ['./add-manual-teacher.component.css']
})
export class AddManualTeacherComponent implements OnInit {

  backRouteTeacher: string;
  titleTeacher: string;
  isPrincipalTeacher: boolean;
  teacher: FormGroup;

  constructor(private rolePermission: RolePermission, private userService: UserService, private route: ActivatedRoute,
    private dialog: Dialog) {
    let idFaculty = this.route.snapshot.paramMap.get('idFaculty') || '';
    let idDepartment = this.route.snapshot.paramMap.get('idDepartment') || '';
    this.backRouteTeacher = '/gestion-docentes/agregar/facultad/' + idFaculty + '/departamento/' + idDepartment;
    this.titleTeacher = 'Agregar Docentes - Manual';
    this.isPrincipalTeacher = false;
    this.teacher = new FormGroup({
      selectedFaculty: new FormControl({value: sessionStorage.getItem('nameFaculty'), disabled: true}),
      selectedDepartment: new FormControl({value: sessionStorage.getItem('nameDepartment'), disabled: true}),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

  addManualTeacher() {
    if(this.teacher.valid) {
      let idFaculty = this.route.snapshot.paramMap.get('idFaculty') || '';
      let idDepartment = this.route.snapshot.paramMap.get('idDepartment') || '';
      this.userService.addTeacherList([this.teacher.get('email')?.value], idDepartment).subscribe({
        next: addUserResponse => {
          this.dialog.openDialog(addUserResponse.msg, '/gestion-docentes');
        },
        error: (error: HttpErrorResponse) => {
          let route = '/gestion-docentes/agregar/manual/facultad/' + idFaculty + '/departamento/' + idDepartment;
          this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError(route, error));
        }
      });
    }
  }

}
