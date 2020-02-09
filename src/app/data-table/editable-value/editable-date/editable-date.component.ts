import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gdr-editable-date',
  templateUrl: './editable-date.component.html',
  styleUrls: ['./editable-date.component.scss']
})
export class EditableDateComponent implements OnInit {
  @Output() save = new EventEmitter<Date>();
  @Output() cancel = new EventEmitter();

  initValue: Date;

  open = false;
  valueControl = new FormControl();

  constructor() { }

  ngOnInit() {

  }

  @Input() set value(value: Date) {
    this.initValue = value;
    this.valueControl.setValue(value);
  }

  get value() {
    return this.valueControl.value;
  }
}
