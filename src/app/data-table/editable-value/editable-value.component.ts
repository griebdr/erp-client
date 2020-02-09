import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { EditableType, TextOptions, TableOptions, ObjectOptions } from './editable-type';
import EditableValue from './editable-value';
import * as Lodash from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'gdr-editable-value',
  templateUrl: './editable-value.component.html',
  styleUrls: ['./editable-value.component.scss']
})
export class EditableValueComponent implements OnInit, EditableValue {
  @Input() type: EditableType;
  @Input() options: TextOptions | TableOptions | ObjectOptions;
  @Input() valueConfirmed: Observable<void>;
  @Input() value: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<any>();

  initialValue: string | number | Date | object | object[];
  saveValue: any;
  private cancelValue: string | number | Date | object | object[];

  @ViewChild('editableValue', { static: false }) editableValue: any;

  ngOnInit() {
    console.log(this.value);
    // this.initialValue = this.value;
    this.value = 'abc';
  }

  onSave(value: any) {
    // this.saveValue = value;
    // this.save.emit(this.saveValue);
    console.log('saving value');
    this.value = value;
    this.editableValue.open = false;
  }

  onCancel(value: any) {
    // this.editableValue.value = Lodash.cloneDeep(this.cancelValue);
    // this.editableValue.open = false;
    // this.cancel.emit(value);
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

  // @Input() set value(value: string | number | Date | object | object[]) {
  //   this.initialValue = value;
  //   this.cancelValue = Lodash.cloneDeep(value);
  //   if (this.editableValue !== undefined) {
  //     this.editableValue.value = value;
  //   }
  // }

  // get value() {
  //   return this.editableValue.value;
  // }
}
