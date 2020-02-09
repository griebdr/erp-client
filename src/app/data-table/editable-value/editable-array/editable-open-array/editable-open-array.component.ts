import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableOptions } from '../../editable-type';
import { DataTableComponent } from '../../../data-table/data-table.component';
import { Subject } from 'rxjs';

interface DialogData {
  data: any[];
  options: TableOptions;
  modified: Subject<any>;
}

@Component({
  selector: 'gdr-editable-open-array',
  templateUrl: './editable-open-array.component.html',
  styleUrls: ['./editable-open-array.component.scss']
})
export class EditableOpenArrayComponent implements OnInit {

  @ViewChild('table', { static: false }) table: DataTableComponent;

  constructor(
    public dialogRef: MatDialogRef<EditableOpenArrayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    if (!this.data.data) {
      this.data.data = [];
    }

    this.data.data = this.data.data.map(data => {
      return { name: data };
    });

    this.data.options = Object.assign({}, { save: true, cancel: true }, this.data.options);
  }

  onSave(value: any) {
    this.dialogRef.close(value.map((data: any) => data.name));
  }

  onModification(modification: any) {
    this.data.modified.next(modification);
  }
}
