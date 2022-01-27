import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(public auth: AuthService) { }

  signUp() {
    this.auth.signUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signIn() {
    this.auth.signIn(this.email, this.password);
    this.email = '';
    this.password = '';

  }

  signOut() {
    this.auth.signOut();
  }

  ngOnInit(): void {
  }

  login() {
    this.auth.login();
  }
}
