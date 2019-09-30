import { Component, OnInit, Inject, Input, ViewChildren, QueryList } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableInfo } from '../editable-value/editable-type';
import EditableValue from '../editable-value/editable-value';

@Component({
  selector: 'app-table-insert',
  templateUrl: './table-insert.component.html',
  styleUrls: ['./table-insert.component.scss']
})
export class TableInsertComponent implements OnInit {
  value = {};

  @ViewChildren('editableValue') editableValues: QueryList<any>;

  constructor(
    public dialogRef: MatDialogRef<TableInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public tableInfo: TableInfo
  ) {

  }

  ngOnInit(): void {

  }

  get openedEditableValue() {
    let editableValue2: any;

    this.editableValues.forEach(editableValue => {
      if (editableValue.open === true) {
        editableValue2 = editableValue;
      }
    });

    return editableValue2;
  }

  openEditableValue(editableValue: EditableValue) {
    if (!this.openedEditableValue) {
      editableValue.open = true;
    }
  }

}
