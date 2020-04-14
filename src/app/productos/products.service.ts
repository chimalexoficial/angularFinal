import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productos: Product[];
  filtrados: Product[];
  pArray: Product[];
  filtradosMonitoreados: Product[];

  productSubject = new Subject<Product[]>();
  productMonitoreadosSubject = new Subject<Product[]>();
  productMonitoreadosBooleanSubject = new Subject<boolean[]>();

  constructor() {

    this.productos = [new Product(100, 'Smartphone',
    'LG', 'Pantalla curva', 12000, 1, [new Especificacion("a", "b", "c")]),
    new Product(101, 'Smartwatch',
    'Samsung', 'Quadcore 3GHZ', 4999, 5, [new Especificacion("a", "b", "c")]),
    new Product(102, 'SmartTV',
    'Sony', 'Con WiFi', 6900, 0, [new Especificacion("a", "b", "c")])];

    this.pArray = []
    this.productSubject.next(this.getProducts());

  }

  getProducts(): Product[] {
    return this.productos.slice();
  }

  getProductosMonitoreados(): Product[] {
    return this.pArray.slice();
  }

  getProduct(id: number): Product {
    console.log(id);
    let e = this.productos.find(e => e.uid == id);
    return Object.assign({}, e);
  }

  addProduct(newProduct: Product) {
    this.productos.push(newProduct);
    this.productSubject.next(this.getProducts());
  }

  editProduct(productToEdit: Product) {
    let element = this.productos.findIndex((prod) => prod.uid == productToEdit.uid);
    this.productos.splice(element, 1, productToEdit);
    this.productSubject.next(this.getProducts());

    let exists = this.pArray.find((prod) => prod.uid == productToEdit.uid);
    if (exists) {
      let index = this.pArray.findIndex((prod) => prod.uid == productToEdit.uid);
      this.pArray.splice(index, 1, productToEdit);
      this.productSubject.next(this.getProductosMonitoreados());
    }

  }

  eliminateProduct(index: number, flag: boolean) {
    if (flag) {
      this.productos.splice(index, 1);
      this.productSubject.next(this.getProducts());
    } else {
      this.pArray.splice(index, 1);
    }
  }

  searching(inputValue: string) {
    this.filtrados = this.productos.filter(p => p.nombre.toUpperCase().includes(inputValue.toUpperCase())
      || p.descripcion.toUpperCase().includes(inputValue.toUpperCase()));
    this.productSubject.next(this.filtrados);
  }
}