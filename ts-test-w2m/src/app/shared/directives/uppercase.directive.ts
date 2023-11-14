// uppercase.directive.ts
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[upperCase]',
})
export class UppercaseDirective {
  constructor() {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    (event.target as HTMLInputElement).value = inputValue.toUpperCase();
  }
}
