import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { EditableType, TextOptions, TableOptions, ObjectOptions } from './editable-type';
import EditableValue from './editable-value';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-editable-value',
  templateUrl: './editable-value.component.html',
  styleUrls: ['./editable-value.component.scss']
})
export class EditableValueComponent implements OnInit, EditableValue {
  @Input() type: EditableType;
  @Input() options: TextOptions | TableOptions | ObjectOptions;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<any>();

  public initialValue: string | number | Date | object | object[];
  private cancelValue: string | number | Date | object | object[];

  @ViewChild('editableValue', { static: false }) editableValue: any;

  ngOnInit() {

  }

  onSave(value: any) {
    this.cancelValue = Lodash.cloneDeep(value);
    this.editableValue.open = false;
    this.save.emit(value);
  }

  onCancel(value: any) {
    this.editableValue.value = Lodash.cloneDeep(this.cancelValue);
    this.editableValue.open = false;
    this.cancel.emit(value);
  }

  onModification(modification: any) {
    this.modified.emit(modification);
  }

  get open() {
    if (this.editableValue === undefined || this.editableValue.open === undefined) {
      return false;
    }
    return this.editableValue.open;
  }

  set open(open: boolean) {
    this.editableValue.open = open;
  }

  @Input() set value(value: any) {
    if (this.type === 'table') {
      this.initialValue = value;
      this.cancelValue = value;
    } else {
      this.initialValue = Lodash.cloneDeep(value);
      this.cancelValue = Lodash.cloneDeep(value);
    }

    if (this.editableValue !== undefined) {
      this.editableValue.value = value;
    }
  }

  get value() {
    return this.editableValue.value;
  }
}
