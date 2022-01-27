import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shopping-cart.service";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: any;
  constructor(private shoppingCartService: ShoppingCartService, private db: AngularFireDatabase) { }

  async ngOnInit(){
    this.cart$ = await this.getCart(this.getOrCreateCardId());
  }

  private getCart(cartId: Promise<string | null>) {
    let x =  this.db.object('/shopping-carts/' + cartId);
    console.log(x);
    return x;
  }

  private async getOrCreateCardId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.shoppingCartService.create();
    if (typeof result.key === "string") {
      localStorage.setItem('cartId', result.key);
    }
    return result.key;

  }
}
