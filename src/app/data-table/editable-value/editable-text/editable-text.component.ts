import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  open = false;
  valueControl = new FormControl();
  
  constructor() { }

  ngOnInit() {

  }

  @Input() set value(value: string) { 
    this.valueControl.setValue(value); 
  };

  get value() {
    return this.valueControl.value;
  }

}
