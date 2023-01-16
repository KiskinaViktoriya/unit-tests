import { StoreService } from './../../../../services/store.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { of } from 'rxjs';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let storeServiceMock: any;

  beforeEach(async(() => {
    storeServiceMock = jasmine.createSpyObj('StoreService', [
      'getAllCategories',
    ]);
    storeServiceMock.getAllCategories.and.returnValue(of(['']));

    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      providers: [
        {
          provide: StoreService,
          useValue: storeServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send event though @Output()', () => {
    const event = spyOn(component.showCategory, 'emit');

    component.onShowCategory('category');

    expect(event).toHaveBeenCalledWith('category');
  });

  it('should get categories', () => {
    storeServiceMock.getAllCategories.and.returnValue(
      of(['jewelery', 'electronics'])
    );

    component.ngOnInit();
    expect(component.categories).toEqual(['jewelery', 'electronics']);
  });
});
