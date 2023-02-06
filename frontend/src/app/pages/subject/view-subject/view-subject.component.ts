import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolePermission } from 'src/app/services/RolePermission';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.css']
})
export class ViewSubjectComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  idSubject: string;

  constructor(private rolePermission: RolePermission, private route: ActivatedRoute) {
    this.backRoute = 'gestion-plan-estudio';
    this.title = 'Visualizar Asignatura';
    this.isPrincipal = false;
    this.idSubject = this.route.snapshot.paramMap.get('idSubject') || '';
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

}
