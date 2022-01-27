import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppUser} from "./models/app-user";
import {switchMap} from "rxjs/operators";
import { of } from 'rxjs';
import {UserService} from "./user.service";
import {User} from "firebase";
import App = firebase.app.App;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute,
              private userService: UserService) {
    this.user$ = afAuth.authState;
    console.log(this.user$);
  }

  signUp(email: string | undefined, password: string | undefined) {
    if (email != null) {
      if (password != null) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
          console.log("You are successfully signed up!", res);
        })
          .catch(error => {
            console.log("Something is wrong", error.message);
          })
      }
    }
  }

  signIn(email: string | undefined, password: string | undefined) {
    if (email != null) {
      if (password != null) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
          console.log('You are Successfully logged in!', res);
        }).catch(error => {
          console.log('Something is wrong:', error.message);
        });
      }
    }

  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl); //sa ne intoarca la pagina accesata inainte de login

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser | null> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();


        return of(null);
      }));
  }
}

