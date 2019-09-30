import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { EditableType, EditableTypeInfo, EditableTypeName } from './editable-type';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import EditableValue from './editable-value';


@Component({
  selector: 'app-editable-value',
  templateUrl: './editable-value.component.html',
  styleUrls: ['./editable-value.component.scss']
})
export class EditableValueComponent implements OnInit, EditableValue {
  @Input() value: string | number | Date | object | object[];
  @Input() typeInfo: EditableTypeInfo;
  @Input() typeName: EditableTypeName;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<any>();

  @ViewChild('editableValue', { static: false }) editableValue: any;

  ngOnInit() {

  }

  get open() {
    if (this.editableValue === undefined) {
      return false;
    }
    return this.editableValue.open;
  }

  set open(open: boolean) {
    this.editableValue.open = open;
  }

  onSave(value: any) {
    this.save.emit(value);
  }

  onCancel() {
    this.editableValue.value = this.value;
    this.cancel.emit();
  }

  onModification(modification: any) {
    this.modified.emit(modification );
  }

}
