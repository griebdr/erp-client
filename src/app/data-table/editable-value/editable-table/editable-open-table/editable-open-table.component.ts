import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableOptions } from '../../editable-type';
import { DataTableComponent } from '../../../data-table/data-table.component';
import { Subject } from 'rxjs';

interface DialogData {
  data: object[];
  options: TableOptions;
  modified: Subject<any>;
}

@Component({
  selector: 'app-editable-open-table',
  templateUrl: './editable-open-table.component.html',
  styleUrls: ['./editable-open-table.component.scss']
})
export class EditableOpenTableComponent implements OnInit {
  @ViewChild('table', { static: false }) table: DataTableComponent;

  constructor(
    public dialogRef: MatDialogRef<EditableOpenTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.data.options = Object.assign({}, { save: true, cancel: true }, this.data.options);
  }

  onSave(value: any) {
    this.dialogRef.close(this.table.dataSource.data);
  }

  onModification(modification: any) {
    this.data.modified.next(modification);
  }
}
