import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gdr-editable-number',
  templateUrl: './editable-number.component.html',
  styleUrls: ['./editable-number.component.scss']
})
export class EditableNumberComponent implements OnInit {
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  open = false;
  valueControl = new FormControl();

  constructor() { }

  ngOnInit() {

  }

  @Input() set value(value: string) {
    this.valueControl.setValue(value);
  }

  get value() {
    return this.valueControl.value;
  }
}
