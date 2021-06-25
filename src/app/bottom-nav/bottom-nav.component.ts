import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.sass']
})
export class BottomNavComponent implements OnInit {

  productToBuyCount = 0;
  constructor(public productService: ProductsService) {
  }

  ngOnInit(): void {
    this.productService.productToBuyCount.subscribe(value => 
      this.productToBuyCount = value
    );
  }

}
