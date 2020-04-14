import { Component, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { ProductsService } from '../../products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product;
  constructor( private router: Router,private route: ActivatedRoute,private productService:ProductsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.id = params['id']);
    this.product = this.productService.getProduct(this.id);
    console.log(this.product);
  }

}
