import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  signUp() {
    this.auth.signUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }


}
