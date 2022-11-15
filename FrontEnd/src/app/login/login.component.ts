import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService,
  SocialUser,
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: SocialAuthService) {
    this.user = new SocialUser();
    this.loggedIn = false;
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
      console.log(this.loggedIn);
    });
  }

  signOut(): void {
    console.log("Salir");
    this.authService.signOut();
  }

}
