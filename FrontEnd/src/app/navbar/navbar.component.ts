import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ LoginComponent ]
})
export class NavbarComponent implements OnInit {

  constructor(private loginComponent: LoginComponent) { }

  ngOnInit(): void {
  }

  logOut() {
    this.loginComponent.logOut();
  }

}
