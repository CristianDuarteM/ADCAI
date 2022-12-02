import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tokenGoogle: string;

  constructor(private navigation: Router) {
    this.tokenGoogle = '';
  }

  ngOnInit() {
    this.tokenGoogle = sessionStorage.getItem('tokenGoogle') || '';
    if(this.tokenGoogle !== ''){
      this.navigation.navigate(['/home']);
    }
  }

  logOut() {
    //Avisar al backend que se cierra la sesion
    sessionStorage.clear();
    location.replace('/login');
  }

}
