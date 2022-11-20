import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tokenGoogle: string;

  constructor(private navegation: Router) {
    this.tokenGoogle = '';
  }

  ngOnInit() {
    this.tokenGoogle = sessionStorage.getItem('tokenGoogle') || '';
    if(this.tokenGoogle !== ''){
      this.navegation.navigate(['/home']);
    }
  }

}
