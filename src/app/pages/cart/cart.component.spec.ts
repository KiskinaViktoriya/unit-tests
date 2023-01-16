import { CartService } from './../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let matSnackBarMock: any;

  beforeEach(async(() => {
    matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: MatSnackBar, useValue: matSnackBarMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get one fake product in cart', () => {
    const expectedProduct = {
      product: 'fakeProduct',
      name: 'fakeProduct',
      price: 10,
      quantity: 1,
      id: 1,
    };

    const service = fixture.debugElement.injector.get(CartService);
    service.cart.next({ items: [expectedProduct] });
    component.ngOnInit();

    expect(component.cart.items[0]).toEqual(expectedProduct);
    expect(component.dataSource).toEqual([expectedProduct]);
  });
});
