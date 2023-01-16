import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductBoxComponent } from './product-box.component';

describe('ProductBoxComponent', () => {
  let component: ProductBoxComponent;
  let fixture: ComponentFixture<ProductBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductBoxComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBoxComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      title: 'fakeProduct',
      price: 10,
      category: 'category',
      description: 'desc',
      image: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get new product and fullWidthMode through @Input()', () => {
    component.product = {
      id: 2,
      title: 'fakeProduct2',
      price: 10,
      category: 'category',
      description: 'desc',
      image: '',
    };
    component.fullWidthMode = true;
    const expectedProduct = {
      id: 2,
      title: 'fakeProduct2',
      price: 10,
      category: 'category',
      description: 'desc',
      image: '',
    };
    expect(component.product).toEqual(expectedProduct);
    expect(component.fullWidthMode).toBeTrue();
  });

  it('should send event through @Output()', () => {
    const event = spyOn(component.addToCart, 'emit');
    component.onAddToCart();
    expect(event).toHaveBeenCalledWith({
      id: 1,
      title: 'fakeProduct',
      price: 10,
      category: 'category',
      description: 'desc',
      image: '',
    });
  });

  it('should change find an element product-box with text-center', () => {
    component.fullWidthMode = true;
    fixture.detectChanges();
    const productBoxCenter = fixture.debugElement.query(
      By.css('.product-box.text-center')
    );
    expect(productBoxCenter).toBeNull();

    component.fullWidthMode = false;
    fixture.detectChanges();
    const productBox = fixture.debugElement.query(
      By.css('.product-box.text-center')
    );
    expect(productBox).not.toBeNull();
  });
});
