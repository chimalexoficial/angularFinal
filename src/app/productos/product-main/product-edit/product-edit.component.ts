import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Product, Especificacion } from '../../Product';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  agregando: boolean;
  uid: number;
  especificaciones = new Especificacion(null, null, null);
  marcas = ['LG', 'Samsung', 'Sony'];

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductsService) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.agregando = false;
      this.route.params.subscribe((params) => {
        this.uid = params['id'];
        this.product = this.productService.getProduct(this.uid);
        console.log(this.product);
      });
    } else {
      this.agregando = true;
      this.product = new Product(0, '', '', '', 0, 0, []);
    }

  }



  returnHome() {
    this.router.navigate(['/products']);
  }

  agregarEspecificacion() {
    this.product.especificacion.push(this.especificaciones);
    this.especificaciones = new Especificacion(null, null, null);
  }

  submit(formulario: NgForm) {
    if (this.agregando === true) {
      this.productService.addProduct(Object.assign({}, this.product));
      this.returnHome();
    }
    else if (formulario.valid === true && this.agregando === false) {
      this.productService.editProduct(Object.assign({}, this.product));
      this.returnHome();
    }
    else {
      this.returnHome();
    }

  }

  deleteProduct(index: number) {
    this.product.especificacion.splice(index, 1);
  }

}
