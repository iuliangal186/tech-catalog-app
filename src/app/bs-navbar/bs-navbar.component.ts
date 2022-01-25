import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase';
import {AuthService} from "../auth.service";

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }
}
