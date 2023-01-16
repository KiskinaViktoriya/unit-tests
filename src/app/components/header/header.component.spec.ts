import { CartService } from './../../services/cart.service';
import { CartComponent } from './../../pages/cart/cart.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartServiceMock: CartService;
  let matSnackBarMock: any;

  beforeEach(async(() => {
    cartServiceMock = jasmine.createSpyObj('CartService', [
      'clearCart',
      'getTotal',
    ]);
    matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        RouterTestingModule.withRoutes([
          { path: 'cart', component: CartComponent },
        ]),
      ],
      declarations: [HeaderComponent],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBarMock },
        { provide: CartService, useValue: cartServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.cart.items = [
      {
        product: 'fakeProduct',
        name: 'fakeProduct',
        price: 10,
        quantity: 1,
        id: 1,
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render new product through @Input()', () => {
    component.cart.items = [
      {
        product: 'fakeProduct1',
        name: 'fakeProduct1',
        price: 10,
        quantity: 1,
        id: 1,
      },
    ];
    const expectedProduct = {
      product: 'fakeProduct1',
      name: 'fakeProduct1',
      price: 10,
      quantity: 1,
      id: 1,
    };
    expect(component.cart.items).toEqual([expectedProduct]);
  });

  it('should navigate to home Component', () => {
    const router = TestBed.get(Router);

    spyOn(router, 'navigateByUrl');

    const button = fixture.debugElement.query(By.css('.logo-home'));
    button.nativeElement.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith(
      router.createUrlTree(['/home']),
      {
        skipLocationChange: false,
        replaceUrl: false,
        state: undefined,
      }
    );
  });

  it('shoul call cartService', () => {
    component.onClearCart();
    expect(cartServiceMock.clearCart).toHaveBeenCalled();
  });

  it('should call cartService with all products', () => {
    component.getTotal(component.cart.items);
    expect(cartServiceMock.getTotal).toHaveBeenCalledWith(component.cart.items);
  });
});
