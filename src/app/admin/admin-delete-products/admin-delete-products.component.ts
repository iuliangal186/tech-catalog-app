import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../product.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-delete-products',
  templateUrl: './admin-delete-products.component.html',
  styleUrls: ['./admin-delete-products.component.css']
})
export class AdminDeleteProductsComponent implements OnInit {

  products$;
  currentProduct!: Product;
  currentIndex = -1;
  title = '';

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }

  ngOnInit(): void {
  }

  deleteProduct(productKey: any): void {
    this.productService.delete(productKey)
      .catch(err => console.log(err));
  }

}
