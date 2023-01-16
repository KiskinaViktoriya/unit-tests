import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirstDependencyService {
  defaultValue: string | undefined;

  constructor() {
    this.initValue('');
  }

  returnValue(index: number): string {
    const values = ['one', 'two', 'three'];
    return values[index];
  }

  initValue(text: string): void {
    this.defaultValue = 'one';
  }
}
