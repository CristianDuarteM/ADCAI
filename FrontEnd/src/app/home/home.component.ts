import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tokenGoogle: string;
  rolesList: string[];
  activeRole: string;

  constructor() {
    this.tokenGoogle = '';
    //Modificar de acuerdo a la respuesta
    this.rolesList = [];
    this.activeRole = '';
  }

  ngOnInit(): void {
    this.tokenGoogle = sessionStorage.getItem("tokenGoogle") || '';
    //Validar la sesion con el backend
    //Guardar los roles de acuerdo a la respuesta
    this.rolesList = ['Administrador', 'Decano', 'Director', 'Docente'];
    sessionStorage.setItem('RolesList', this.rolesList.toString());
    //Cargar un rol por defecto
    this.activeRole = 'Administrador';
    sessionStorage.setItem("activeRole", this.activeRole);
  }

}
