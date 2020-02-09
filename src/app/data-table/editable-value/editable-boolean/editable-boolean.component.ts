import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'gdr-editable-boolean',
  templateUrl: './editable-boolean.component.html',
  styleUrls: ['./editable-boolean.component.scss']
})
export class EditableBooleanComponent implements OnInit {

  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  open = false;
  valueControl = new FormControl();
  formGroup = new FormGroup({ checkBoxControl: this.valueControl });

  constructor() { }

  ngOnInit() {

  }

  @Input() set value(value: boolean) {
    this.valueControl.setValue(value);
  }

  get value() {
    return this.valueControl.value;
  }

}
