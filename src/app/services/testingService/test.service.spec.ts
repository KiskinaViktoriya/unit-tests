import { FirstDependencyService } from './first-dependency/firstDependency.service';
import { TestBed } from '@angular/core/testing';
import { TestingService } from './test.service';

describe('Testng service', () => {
  let service: TestingService;
  let firstDependency: FirstDependencyService;

  //   const fakeFirstDependency = {
  //     returnValue: jasmine.createSpy('returnValue'),
  //     initValue: jasmine.createSpy('initValue '),
  //   };

  const fakeFirstDependency = jasmine.createSpyObj([
    'initValue',
    'returnValue',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestingService,
        { provide: FirstDependencyService, useValue: fakeFirstDependency },
      ],
    });

    service = TestBed.inject(TestingService);
    //firstDependency = TestBed.inject(FirstDependencyService);
    fakeFirstDependency.returnValue.and.returnValue('two');
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  it('should return value by index 1', () => {
    //spyOn(firstDependency, 'returnValue').and.callFake(() => 'one');
    const result = service.getValue(1);
    expect(result).toBe('two');
  });

  it('should return value by index 0', () => {
    fakeFirstDependency.returnValue.and.returnValue('one');
    const result = service.getValue(0);
    expect(result).toBe('one');
  });

  it('sayHi() should call initValue()', () => {
    fakeFirstDependency.initValue.calls.reset();
    service.sayHi('text');
    expect(fakeFirstDependency.initValue).toHaveBeenCalled();
    expect(fakeFirstDependency.initValue).toHaveBeenCalledTimes(1);
    expect(fakeFirstDependency.initValue).toHaveBeenCalledWith('text');
  });
});
