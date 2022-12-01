import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-roles',
  styleUrls: ['./roles.component.css'],
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {
  constructor(private ngxPermissonsService: NgxPermissionsService) { }

  ngOnInit(): void {
  }

  changeRole(role: string) {
    sessionStorage.setItem("activeRole", role);
    this.ngxPermissonsService.loadPermissions([role]);
    location.replace('/home');
  }

}
