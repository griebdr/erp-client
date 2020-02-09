import { EventEmitter } from '@angular/core';
import { TableOptions, TextOptions, ObjectOptions } from './editable-type';

export default interface EditableValue {
  value: string | number | Date | object | object[];
  options: TableOptions | TextOptions | ObjectOptions;
  save: EventEmitter<any>;
  cancel: EventEmitter<any>;
  modified?: EventEmitter<any>;
  open: boolean;
}
