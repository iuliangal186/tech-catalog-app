import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Product} from "./models/product";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  public create() {
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    });
  }

  private async getOrCreateCardId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    if (typeof result.key === "string") {
      localStorage.setItem('cartId', result.key);
    }
    return result.key;

  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  public async addToCart(product: Product) {
    const cartId = await this.getOrCreateCardId();
    let cart$:any;
    if(cartId) {
      cart$ = this.getCart(cartId);
    }
    console.log(product.$key);

    cart$.snapshotChanges()
      .pipe(take(1))
      .subscribe( (rez :any) => {
        cart$.update({
          product: product
        });
      });
  }

}
