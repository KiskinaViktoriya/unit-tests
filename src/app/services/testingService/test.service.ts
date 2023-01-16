import { FirstDependencyService } from './first-dependency/firstDependency.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TestingService {
  constructor(private firstDepenpencyService: FirstDependencyService) {
    this.firstDepenpencyService.initValue('');
  }

  getValue(index: number) {
    return this.firstDepenpencyService.returnValue(index);
  }

  getIndex() {
    return 2;
  }

  sayHi(text: string): void {
    this.firstDepenpencyService.initValue(text);
  }
}
