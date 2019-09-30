import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import EditableValue from '../editable-value';
import { TableInfo, TableModification } from '../editable-type';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent implements OnInit, EditableValue {
  @Input() typeInfo: TableInfo;
  @Input() value: object[];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<TableModification>();

  open = false;

  constructor() {
  
  }

  ngOnInit() {
    this.typeInfo.features = Object.assign({}, this.typeInfo.features, { close: true, save: true });
  }
}
