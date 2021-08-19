import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.sass'],
  animations: [
    trigger('bounce', [
      state('initial', style('*')),
      state('active', style('*')),
      transition('initial <=> active', [
        animate('0.5s', keyframes([
          style({ transform: 'scale(1,1) translateY(0)' }),
          style({ transform: 'scale(1.1, 0.9) translateY(0)' }),
          style({ transform: 'scale(0.9, 1.1) translateY(-20px)' }),
          style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
          style({ transform: 'scale(1,1) translateY(-5px)' }),
          style({ transform: 'scale(1,1) translateY(0)' })
        ]))
      ])
    ])
  ]
})
export class BottomNavComponent implements OnInit {

  /**
   * Bounce state to animate the cart button.
   */
  bounceState = 'initial';

  /**
   * Number of product to buy.
   */
  productToBuyCount = -1;

  constructor(public productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.productsToBuy.subscribe(products => {
      // trigger the animation
      if (this.productToBuyCount !== -1
          && this.productToBuyCount !== products.length) {
        this.bounceState === 'initial' ? this.bounceState = 'active' : this.bounceState = 'initial';
      }
      this.productToBuyCount = products.length;
    });
  }

}
