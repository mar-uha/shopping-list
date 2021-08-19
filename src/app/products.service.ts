import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  

  productsToBuy: BehaviorSubject<Product[]> = new BehaviorSubject(new Array());

  constructor() { }

  /**
   * Create a new product reference in a store.
   * @param product Product to create.
   * @returns List of products saved and sorted.
   */
  create(product: Product): Product[] {
    let products = this.list();
    products.push(product);
    return this.save(products);
  }

  /**
   * Returns all products in a store.
   * @returns List of products saved and sorted.
   */
  list(): Product[] {
    const value = window.localStorage.getItem('allProducts');
    if (value) {
      return JSON.parse(value);
    }
    return [] as Product[];
  }

  /**
   * Delete a product for the name given in parameter.
   * @param productName Product name to delete.
   * @returns List of products saved and sorted.
   */
  delete(productName: string): Product[] {
    let products = this.list();
    products = products.filter(product => product.name !== productName);

    return this.save(products);
  }
  
  setProductsToBuy(products: Product[]): void {
    this.productsToBuy.next(products);
  }

  /**
   * Rename a product.
   * @param oldproductName Old product to rename.
   * @param newProductName New product name.
   * @returns List of products saved and sorted.
   */
  rename(oldproductName: string, newProductName: string): Product[] {
    let products = this.list();
    let productIdx = products.findIndex(product => product.name === oldproductName);
    products[productIdx].name = newProductName;
    return this.save(products);
  }

  /**
   * Save and sort all product passed in parameter.
   * @param products List of products to save.
   * @returns List of products saved and sorted.
   */
  save(products: Product[]): Product[] {
    products.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
    window.localStorage.setItem('allProducts', JSON.stringify(products));

    return products;
  }

}
