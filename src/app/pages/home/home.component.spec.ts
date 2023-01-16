import { CartService } from './../../services/cart.service';
import { StoreService } from './../../services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let storeServiceMock: any;
  let cartServiceMock: any;
  let matSnackBarMock: any;

  beforeEach(async(() => {
    storeServiceMock = jasmine.createSpyObj('StoreService', ['getAllProducts']);
    storeServiceMock.getAllProducts.and.returnValue(of(['']));
    cartServiceMock = jasmine.createSpyObj('CartService', [
      'addQuantityInCart',
    ]);
    matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBarMock },
        { provide: StoreService, useValue: storeServiceMock },
        { provide: CartService, useValue: cartServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get one fake product', () => {
    const expectedProduct = {
      product: 'fakeProduct',
      price: 10,
      id: 1,
      title: 'fakeProduct',
      category: 'category',
      description: 'desc',
      image: '',
    };

    storeServiceMock.getAllProducts.and.returnValue(of([expectedProduct]));
    component.ngOnInit();

    expect(component.products).toEqual([expectedProduct]);
  });

  it('should change displayed coulumns on 4 and rows height on 350', () => {
    component.onColumnsCountChange(4);
    expect(component.cols).toBe(4);
    expect(component.rowHeight).toBe(350);
  });

  it('should show only jewelery products', () => {
    storeServiceMock.getAllProducts.and.returnValue(
      of([
        {
          product: 'fakeProduct',
          price: 10,
          id: 1,
          title: 'fakeProduct',
          category: 'jewelery',
          description: 'desc',
          image: '',
        },
      ])
    );
    component.onShowCategory('jewelery');

    expect(component.category).toBe('jewelery');
    expect(component.products[0].category).toBe('jewelery');
  });
});
