import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() : Observable<any> {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges() as Observable<any>;
  }
}
