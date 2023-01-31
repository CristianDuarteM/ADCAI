import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolePermission } from 'src/app/models/RolePermission';

@Component({
  selector: 'app-add-manual-subject',
  templateUrl: './add-manual-subject.component.html',
  styleUrls: ['./add-manual-subject.component.css']
})
export class AddManualSubjectComponent implements OnInit {

  backRoute: string;
  title: string;
  isPrincipal: boolean;
  idStudyPlan: string;

  constructor(private rolePermission: RolePermission, private route: ActivatedRoute) {
    this.backRoute = 'gestion-plan-estudio';
    this.title = 'Agregar Asignatura Manual';
    this.isPrincipal = false;
    this.idStudyPlan = this.route.snapshot.paramMap.get('idStudyPlan') || '';
  }

  ngOnInit(): void {
    this.rolePermission.loadRole();
  }

}
