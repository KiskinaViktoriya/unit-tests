import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('Store service ', () => {
  let service: StoreService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoreService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StoreService);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('should create class', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllProducts', () => {
    let expectedProduct: Product[];

    beforeEach(() => {
      expectedProduct = [
        {
          id: 1,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
          price: 109.95,
          description:
            'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
          category: "men's clothing",
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          rating: {
            rate: 3.9,
            count: 120,
          },
        },
      ] as Product[];
    });

    const STORE_BASE_URL = 'https://fakestoreapi.com/products';

    it('should be called with default parameters (limit = 12, sort = desc)', () => {
      service.getAllProducts().subscribe((products) => {
        console.log(products);
        expect(products.length).toEqual(
          12,
          'should return expected 12 products'
        );
      });

      const req = httpTestingController.expectOne(
        `${STORE_BASE_URL}?sort=desc&limit=12`
      );
      expect(req.request.method).toEqual('GET');
    });

    it('should return only 1 men clothing products', () => {
      service
        .getAllProducts('1', 'desc', "men's clothing")
        .subscribe((products) => {
          const notMenClothingProducts = products.filter(
            (product) => product.category !== "men's clothing"
          );
          expect(notMenClothingProducts.length).toEqual(
            0,
            'should return null found product'
          );
        });

      const req = httpTestingController.expectOne(
        `${STORE_BASE_URL}/category/men's clothing?sort=desc&limit=1`
      );
      expect(req.request.method).toEqual('GET');
    });

    // //Test case 1
    it('should return only jewelery products', () => {
      service.getAllProducts('12', 'desc', 'jewelery').subscribe((products) => {
        const notJeweleryProducts = products.filter(
          (product) => product.category !== 'jewelery'
        );
        expect(notJeweleryProducts.length).toEqual(
          0,
          'should return expected one product'
        );
      });

      const req = httpTestingController.expectOne(
        `${STORE_BASE_URL}/category/jewelery?sort=desc&limit=12`
      );
      expect(req.request.method).toEqual('GET');
    });

    it('should be OK returning no product', () => {
      service
        .getAllProducts('1')
        .subscribe(
          (products) =>
            expect(products.length).toEqual(
              0,
              'should have empty product array'
            ),
          fail
        );

      const req = httpTestingController.expectOne(
        `${STORE_BASE_URL}?sort=desc&limit=1`
      );
      req.flush([]);
    });

    it('should return 404 error into an empty products result', () => {
      service
        .getAllProducts('1')
        .subscribe(
          (products) =>
            expect(products.length).toEqual(
              0,
              'should return empty products array'
            ),
          fail
        );

      const req = httpTestingController.expectOne(
        `${STORE_BASE_URL}?sort=desc&limit=1`
      );

      const msg = '404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getAllCategories', () => {
    let expectedCategories: Array<string>;

    beforeEach(() => {
      expectedCategories = [
        'electronics',
        'jewelery',
        "men's clothing",
        "women's clothing",
      ];
    });

    const STORE_BASE_URL = 'https://fakestoreapi.com/products/categories';

    it('should return expected categories by calling once', () => {
      service
        .getAllCategories()
        .subscribe((categories) =>
          expect(categories).toEqual(
            expectedCategories,
            'should return expected categories'
          )
        );

      const req = httpTestingController.expectOne(STORE_BASE_URL);
      expect(req.request.method).toEqual('GET');
    });

    it('should be OK returning no categories', () => {
      service
        .getAllCategories()
        .subscribe((categories) =>
          expect(categories.length).toEqual(
            0,
            'should have empty categories array'
          )
        );

      const req = httpTestingController.expectOne(STORE_BASE_URL);
      req.flush([]);
    });

    it('should return 404 error into an empty categories result', () => {
      service
        .getAllCategories()
        .subscribe(
          (categories) =>
            expect(categories.length).toEqual(
              0,
              'should return empty categories array'
            ),
          fail
        );

      const req = httpTestingController.expectOne(STORE_BASE_URL);

      const msg = '404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });
});
