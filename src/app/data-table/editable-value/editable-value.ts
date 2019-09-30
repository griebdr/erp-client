import { EventEmitter } from '@angular/core';
import { EditableTypeInfo } from './editable-type';

export default interface EditableValue {
  value: string | number | Date | object | object[];
  typeInfo: EditableTypeInfo;
  save: EventEmitter<any>;
  cancel: EventEmitter<void>;
  modified?: EventEmitter<any>;
  open: boolean;
}