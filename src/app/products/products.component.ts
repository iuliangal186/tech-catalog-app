import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product.service";
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/product";
import {switchMap} from "rxjs/operators";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  category!: string | null;

  constructor(productService: ProductService,
              route: ActivatedRoute,
              private cartService: ShoppingCartService) {
    productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;})).subscribe( params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });

  }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
