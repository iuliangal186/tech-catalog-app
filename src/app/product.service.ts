import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {map} from 'rxjs';
import {Product} from "./models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products')
      .snapshotChanges().pipe(map(changes => {
        return changes.map(c => {
          const data = c.payload.val() as Product;
          const key = c.payload.key;
          return {key, ...data};
        });
      }));
  }

  // getAllForDelete() {
  //   return this.db.list('/products')
  //     .snapshotChanges().pipe(map(changes => {
  //       console.log(changes);
  //       return changes;
  //     }));
  // }

  get(productId: any) {
    return this.db.object('/products' + productId).valueChanges();
  }

  update(productId: any, product: any) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: any): Promise<void> {
    return this.db.object('/products/' + productId).remove();
  }
}
