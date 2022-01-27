import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../product.service";
import {Observable, Subscription} from "rxjs";
import {Product} from "../../models/product";
import {take} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: Product[];
  filteredProducts!: any;
  subscription: Subscription;
  id;
  product: any;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router,) {
    this.subscription = this.productService.getAll()
      .subscribe((products:Product[]) => this.filteredProducts = this.products = products);
    console.log(this.product);
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  ngOnInit(): void {
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(id: any) {
    if (confirm('Are you sure you want delete?')) {
      this.productService.delete(id);
      console.log(id);
    }
  }
}
