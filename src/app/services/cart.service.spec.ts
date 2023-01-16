import { CartItem } from './../models/cart.model';
import { CartService } from './cart.service';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Cart service', () => {
  let cartService: CartService;
  let productsCart: CartItem[];
  let expectedProduct: CartItem;
  let matSnackBarMock: any;

  beforeEach(() => {
    matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: matSnackBarMock }],
    });

    cartService = TestBed.inject(CartService);
    cartService.cart.subscribe((products) => (productsCart = products.items));

    expectedProduct = {
      product: 'fakeProduct',
      name: 'fakeProduct',
      price: 10,
      quantity: 1,
      id: 1,
    };
  });

  it('should be created', () => {
    expect(cartService).toBeTruthy();
  });

  it('should get empty products in cart', () => {
    cartService.cart.subscribe((products) =>
      expect(products.items.length).toEqual(0)
    );
  });

  it('should add product in cart', () => {
    cartService.addQuantityInCart(expectedProduct);
    expect(productsCart[0]).toEqual(expectedProduct);
  });

  it('should increase quantity of product to one', () => {
    cartService.addQuantityInCart(expectedProduct);
    cartService.addQuantityInCart(expectedProduct);
    expect(productsCart[0].quantity).toEqual(2);
  });

  it('should delete all from cart', () => {
    cartService.addQuantityInCart(expectedProduct);
    cartService.clearCart();
    expect(productsCart.length).toEqual(0);
  });

  it('should delete product from cart', () => {
    cartService.addQuantityInCart(expectedProduct);
    cartService.deleteProduct(expectedProduct);
    const deletedProduct = productsCart.filter(
      (product) => expectedProduct.id === product.id
    );
    expect(deletedProduct.length).toEqual(0);
  });

  it('should decrease quantity of product to one', () => {
    cartService.addQuantityInCart(expectedProduct);
    cartService.addQuantityInCart(expectedProduct);
    cartService.removeQuantity(expectedProduct);
    expect(productsCart[0].quantity).toEqual(1);
  });

  it('should delete product because of quantity become 0', () => {
    cartService.addQuantityInCart(expectedProduct);
    cartService.removeQuantity(expectedProduct);
    const deletedProduct = productsCart.filter(
      (product) => expectedProduct.id === product.id
    );
    expect(deletedProduct.length).toEqual(0);
  });

  it('should return total cost of one product', () => {
    cartService.addQuantityInCart(expectedProduct);
    const total = cartService.getTotal(productsCart);
    expect(total).toEqual(10);
  });

  it('should return total cost of two equal product', () => {
    cartService.addQuantityInCart(expectedProduct);
    cartService.addQuantityInCart(expectedProduct);
    const total = cartService.getTotal(productsCart);
    expect(total).toEqual(20);
  });

  it('should return total cost of empty cart', () => {
    const total = cartService.getTotal(productsCart);
    expect(total).toEqual(0);
  });
});
