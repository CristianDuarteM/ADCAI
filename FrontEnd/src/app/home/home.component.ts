import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tokenGoogle: string;
  roleList: { [key: string]: string };
  activeRole: string;

  constructor(private navigation: Router, private ngxPermissonsService: NgxPermissionsService) {
    this.tokenGoogle = '';
    this.roleList = {
      "ADMIN": "súper administrador",
      "DECANO": "decano",
      "DIRECTOR": "director",
      "DOCENTE": "docente"
    };
    //Modificar de acuerdo a la respuesta
    this.activeRole = '';
  }

  ngOnInit(): void {
    this.tokenGoogle = sessionStorage.getItem("tokenGoogle") || '';
    if(this.tokenGoogle === ''){
      this.navigation.navigate(['/login']);
    }
    //Validar la sesion con el backend
    //Validar si es la primera vez que ingresa
    //Guardar los roles de acuerdo a la respuesta
    //Cargar un rol por defecto
    this.activeRole = sessionStorage.getItem("activeRole") || 'ADMIN';
    sessionStorage.setItem("activeRole", this.activeRole);
    this.ngxPermissonsService.loadPermissions([this.activeRole]);
  }

}
