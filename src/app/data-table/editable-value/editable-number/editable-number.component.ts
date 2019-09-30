import { Component, OnInit, Input, AfterViewInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editable-number',
  templateUrl: './editable-number.component.html',
  styleUrls: ['./editable-number.component.scss']
})
export class EditableNumberComponent implements OnInit {
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();

  open = false;
  valueControl = new FormControl();
  
  constructor() { }

  ngOnInit() {
    this.valueControl.setValue(this.value);
  }

  @Input() set value(value: string) {
    this.valueControl.setValue(value); 
  };

  get value() {
    return this.valueControl.value;
  }
}
