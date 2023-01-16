import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenu } from '@angular/material/menu';
import { By } from '@angular/platform-browser';

import { ProductsHeaderComponent } from './products-header.component';

describe('ProductsHeaderComponent', () => {
  let component: ProductsHeaderComponent;
  let fixture: ComponentFixture<ProductsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsHeaderComponent, MatMenu],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('@Output()', () => {
    it('should send columns count', () => {
      const event = spyOn(component.columnsCountChange, 'emit');
      component.onColumnsUpdated(6);
      expect(event).toHaveBeenCalledWith(6);
    });

    it('should send items count', () => {
      const event = spyOn(component.itemsCountChange, 'emit');
      component.onItemsUpdated(3);
      expect(event).toHaveBeenCalledWith(3);
      expect(component.itemsShowCount).toBe(3);
    });

    it('should send sort', () => {
      const event = spyOn(component.sortChange, 'emit');
      component.onSortUpdated('desc');
      expect(event).toHaveBeenCalledWith('desc');
      expect(component.sort).toBe('desc');
    });
  });

  describe('@Output() through click on button in template', () => {
    it('should send columns count', () => {
      const event = spyOn(component.columnsCountChange, 'emit');
      const button1 = fixture.debugElement.query(By.css('.btn-columns-1'));
      const button3 = fixture.debugElement.query(By.css('.btn-columns-3'));
      const button6 = fixture.debugElement.query(By.css('.btn-columns-6'));

      event.calls.reset();
      button1.nativeElement.click();
      expect(event).toHaveBeenCalledWith(1);
      button3.nativeElement.click();
      expect(event).toHaveBeenCalledWith(3);
      button6.nativeElement.click();
      expect(event).toHaveBeenCalledWith(4);

      expect(event).toHaveBeenCalledTimes(3);
    });
  });
});
