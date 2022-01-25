import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase';
import {AuthService} from "../auth.service";
import {AppUser} from "../models/app-user";

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser | undefined | null;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }
}
