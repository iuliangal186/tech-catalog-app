import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase';
import {AuthService} from "../auth.service";
import {AppUser} from "../models/app-user";
import {Router} from "@angular/router";

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser | undefined | null;

  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login")
  }
}
