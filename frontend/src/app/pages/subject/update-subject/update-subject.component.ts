import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  idSubject: string;

  constructor(private rolePermission: RolePermission, private route: ActivatedRoute) {
    this.backRoute = 'gestion-plan-estudio';
    this.title = 'Actualizar Asignatura';
    this.isPrincipal = false;
    this.idSubject = this.route.snapshot.paramMap.get('idSubject') || '';
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

}
