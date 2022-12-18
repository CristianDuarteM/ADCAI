import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cai } from 'src/app/models/Cai';
import { Dialog } from 'src/app/models/Dialog';
import { RolePermission } from 'src/app/models/RolePermission';
import { CaiTable } from 'src/app/models/table/CaiTable';
import { CaiService } from 'src/app/services/cai/cai.service';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css']
})
export class ViewTeacherComponent implements OnInit {

  backRouteViewTeacher: string;
  titleViewTeacher: string;
  isPrincipalViewTeacher: boolean;
  isEditableViewTeacher: boolean;
  heightTableViewTeacher: { height: string };
  columnsToDisplayViewTeacher: string[];
  headerTableViewTeacher: string;
  buttonRouteViewTeacher: string;
  elementsDataViewTeacher: CaiTable[];
  isLoaded: boolean;

  constructor(private rolePermission: RolePermission, private route: ActivatedRoute, public dialog: Dialog,
    private caiService: CaiService) {
    this.backRouteViewTeacher = '/gestion-docentes';
    this.titleViewTeacher = 'Visualizar Docente';
    this.isPrincipalViewTeacher = false;
    this.isEditableViewTeacher = false;
    this.heightTableViewTeacher = { height: '42vh' };
    this.headerTableViewTeacher = 'Listado de Cargas Académicas Integrales';
    this.buttonRouteViewTeacher = '/gestion-docentes/buscados/ver/cai/';
    this.columnsToDisplayViewTeacher = ['Código','Nombre Completo', 'Id CAI', 'Año', 'Semestre', 'Acción'];
    this.elementsDataViewTeacher = [];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
    this.getCaiListByUser();
  }

  getCaiListByUser() {
    let idUser = this.route.snapshot.paramMap.get('idUser') || '';
    this.caiService.getCaiList(idUser, 'docente', 'no').subscribe({
      next: caiListResponse => {
        this.formatDataToTable(caiListResponse.rows);
      },
      error: (error: HttpErrorResponse) => {
        this.dialog.openDialog(this.dialog.getErrorMessage(error), this.dialog.validateError('/gestion-docentes/buscados/ver/' + idUser, error));
      }
    });
  }

  formatDataToTable(data: Cai[]) {
    this.elementsDataViewTeacher = [];
    for(let i = 0; i < data.length; i++) {
      this.elementsDataViewTeacher.push({
        codigo: data[i].usuario.codigo,
        nombre: data[i].usuario.nombre + ' ' + data[i].usuario.apellido,
        id: data[i].id,
        anno: data[i].periodo.anno,
        semestre: data[i].periodo.semestre,
        departamento: data[i].usuario.departamento.nombre,
      });
    }
    this.isLoaded = true;
  }

}
