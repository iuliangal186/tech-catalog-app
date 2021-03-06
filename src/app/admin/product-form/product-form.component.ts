import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../category.service";
import {ProductService} from "../../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: any;
  product: any;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();
    console.log(categoryService.getAll());
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  ngOnInit(): void {
  }

  save(product:Object) {
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want delete?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
