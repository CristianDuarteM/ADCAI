import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { config } from 'src/app/constants/config';
import { Dialog } from 'src/app/models/Dialog';
import { DepartmentResponse } from 'src/app/models/response/DepartmentResponse';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiService } from 'src/app/services/cai/cai.service';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  caiForm: FormGroup;
  idDepartment: string;
  departmentList: DepartmentResponse[];
  nameDepartment: string;
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, public dialog: Dialog,
    private departmentService: DepartmentService, private caiService: CaiService) {
    this.backRoute = '/home';
    this.title = 'Descarga de los CAI';
    this.isPrincipal = true;
    this.caiForm = new FormGroup({
      departmentInput: new FormControl('')
    });
    this.idDepartment = sessionStorage.getItem(config.SESSION_STORAGE.ID_DEPARTMENT) || '';
    this.departmentList = [];
    this.nameDepartment = '';
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getListDepartment();
    this.rolePermission.loadRole();
  }

  getListDepartment() {
    this.departmentService.getDepartmentById(this.idDepartment).subscribe({
      next: departmentResponse => {
        this.departmentService.getDepartmentListByFaculty(departmentResponse.id_facultad).subscribe({
          next: departmentListResponse => {
            this.departmentList = departmentListResponse;
            let activeRole = sessionStorage.getItem(config.SESSION_STORAGE.ACTIVE_ROLE) || '';
            if(activeRole === 'DIRECTOR') {
              this.nameDepartmentSelected = departmentResponse.nombre;
              this.caiForm.setControl('departmentInput', new FormControl({
                value: parseInt(this.idDepartment),
                disabled: true,
              }));
            }
            this.isLoaded = true;
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  set nameDepartmentSelected(name: string) {
    this.nameDepartment = name;
  }

  onSubmit() {
    let departmentSelected = this.caiForm.get('departmentInput')?.value;
    this.caiService.downloadCaiListByDepartment(departmentSelected).subscribe({
      next: caiDownloadResponse => {
        this.download(caiDownloadResponse);
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/home', error));
      }
    });
  }

  download(zipFile: Blob) {
    const downloadLink = document.createElement('a');
    const objectURL =  URL.createObjectURL(zipFile);
    this.nameDepartment = this.nameDepartment.replace(/\s+/g, '_');
    downloadLink.href = objectURL;
    downloadLink.download = this.nameDepartment + '.zip';
    downloadLink.click();
    URL.revokeObjectURL(objectURL);
  }

}
