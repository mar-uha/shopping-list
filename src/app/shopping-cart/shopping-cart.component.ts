import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {

  productsToBuy: Product[] = [];

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.productsToBuy.subscribe(products =>
      this.productsToBuy = products
    );
  }

  onNgModelChange(e: any): void{
    this.productsService.setProductsToBuy(this.productsToBuy);
  }
}
