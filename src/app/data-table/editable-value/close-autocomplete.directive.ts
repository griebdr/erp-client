import { Directive, ElementRef } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';

@Directive({
  selector: '[gdrCloseAutocomplete]'
})
export class CloseAutocompleteDirective {
  constructor(private el: ElementRef, private trigger: MatAutocompleteTrigger) {
    setTimeout(() => {
      this.el.nativeElement.focus();
      this.trigger.closePanel();
    }, 0);
  }
}
