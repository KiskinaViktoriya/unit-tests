import { CartService } from './services/cart.service';
import { Cart } from './models/cart.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header
      [cart]="cart"
      [productCartQuantity]="productCartQuantity"
    ></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };
  productCartQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
      this.productCartQuantity = cart.items
        .map((item) => item.quantity)
        .reduce((prev, current) => prev + current, 0);
    });
  }
}
