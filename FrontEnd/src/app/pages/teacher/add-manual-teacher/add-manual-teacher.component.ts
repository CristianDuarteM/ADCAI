import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { InformativeDialogComponent } from 'src/app/components/informative-dialog/informative-dialog.component';
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

  constructor(private ngxPermissonsService: NgxPermissionsService, private userService: UserService,
    private route: ActivatedRoute, public dialog: MatDialog) {
    this.backRouteTeacher = '/gestion-docentes/agregar';
    this.titleTeacher = 'Agregar Docentes - Manual';
    this.isPrincipalTeacher = false;
    this.teacher = new FormGroup({
      selectedFaculty: new FormControl({value: sessionStorage.getItem('nameFaculty'), disabled: true}),
      selectedDepartment: new FormControl({value: sessionStorage.getItem('nameDepartment'), disabled: true}),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    let activeRole = sessionStorage.getItem("activeRole") || '';
    this.ngxPermissonsService.loadPermissions([activeRole]);
  }

  addManualTeacher() {
    if(this.teacher.valid) {
      let idDepartment = this.route.snapshot.paramMap.get('idDepartment') || '';
      this.userService.addTeacherList([this.teacher.get('email')?.value], idDepartment).subscribe({
        next: addUserResponse => {
          this.openDialog(addUserResponse.msg, '/gestion-docentes');
        },
        error: (error: HttpErrorResponse) => {
          let route = '/gestion-docentes/agregar/manual/departamento/' + idDepartment;
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
