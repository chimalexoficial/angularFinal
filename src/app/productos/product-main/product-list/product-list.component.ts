import { Component, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { Router,Params, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  flag: boolean;
  productList: Product[];
  prList: Product[];
  inputValue = null;
  addingFlag = false;
  productosMonitoreadosBooleans: boolean[];
  
  constructor(private productService: ProductsService,private router: Router) { 
    this.productList = productService.getProducts();
    this.prList = productService.getProductosMonitoreados();

    console.log(this.productList);
    console.log(this.prList);
    console.log(this.productosMonitoreadosBooleans);

    this.productService.productSubject.subscribe(data=>{
      this.productList = data;
    })

    this.productService.productMonitoreadosSubject.subscribe(data=>{
      this.prList = data;
    })

    this.productService.productMonitoreadosBooleanSubject.subscribe(data=>{
      this.productosMonitoreadosBooleans = data;
    })

  }

  ngOnInit(): void {
    if(this.router.url.includes("monitoreo")){
      this.flag = false;
    }
    else{
      this.flag = true;
    }
  }

  borrar(pos){
    this.productService.eliminateProduct(pos, this.flag);
  }





  buscar(){
    console.log("Buscando");
    this.productService.searching(this.inputValue);
  }

}
