import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[truncate]',
})
export class TruncateDirective implements AfterViewInit {
  @Input() maxLength: number = 50;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const paragraphText = this.el.nativeElement.innerText;

    if (paragraphText.length > this.maxLength) {
      const truncatedText = `${paragraphText.substring(0, this.maxLength)}...`;
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        truncatedText
      );
    }
  }
}
