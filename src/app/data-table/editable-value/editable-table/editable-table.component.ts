import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import EditableValue from '../editable-value';
import { TableOptions } from '../editable-type';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditableOpenTableComponent } from './editable-open-table/editable-open-table.component';

import {ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
})
export class EditableTableComponent implements OnInit, EditableValue {
  @Input() options: TableOptions;
  @Input() value: object[];

  @Output() save = new EventEmitter<object[]>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<any>();

  open2: boolean;
  tableModified = new Subject<any>();
  dialogRef: MatDialogRef<EditableOpenTableComponent>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.tableModified.subscribe((modification) => {
      this.modified.emit(modification);
    });
  }

  set open(open: boolean) {
    this.open2 = open;

    if (open === true) {
      this.dialogRef = this.dialog.open(EditableOpenTableComponent, {
        panelClass: 'table-dialog-container',
        width: '100vw',
        data: { data: this.value, options: this.options, modified: this.tableModified },
        autoFocus: false,
        disableClose: true
      });

      this.dialogRef.afterClosed().subscribe(result => {
        this.open2 = false;
        if (result !== undefined) {
          this.save.emit(result);
        } else {
          this.cancel.emit();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

  get open() {
    return this.open2;
  }
}
