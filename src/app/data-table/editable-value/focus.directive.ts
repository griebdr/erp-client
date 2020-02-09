import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[gdrFocus]'
})
export class FocusDirective implements OnInit {
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => this.el.nativeElement.focus(), 0);
  }
}
