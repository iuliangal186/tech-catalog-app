import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {AppUser} from "../models/app-user";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  appUser: AppUser | undefined | null;

  constructor(public auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(): void {
  }

}
