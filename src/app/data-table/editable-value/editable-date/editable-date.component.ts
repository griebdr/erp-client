import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-editable-date',
  templateUrl: './editable-date.component.html',
  styleUrls: ['./editable-date.component.scss']
})
export class EditableDateComponent implements OnInit {
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();

  open = false;
  valueControl = new FormControl();
  
  constructor() { }

  ngOnInit() {

  }

  @Input() set value(value: string) {
    this.valueControl.setValue(Lodash.cloneDeep(value)); 
  };

  get value() {
    return this.valueControl.value;
  }

}
