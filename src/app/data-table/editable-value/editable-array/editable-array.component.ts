import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableOptions } from '../editable-type';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditableOpenArrayComponent } from './editable-open-array/editable-open-array.component';

@Component({
  selector: 'gdr-editable-array',
  templateUrl: './editable-array.component.html',
  styleUrls: ['./editable-array.component.scss']
})
export class EditableArrayComponent implements OnInit {
  @Input() options: TableOptions;
  @Input() value: any[];

  @Output() save = new EventEmitter<any[]>();
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<any>();

  open2: boolean;
  tableModified = new Subject<any>();
  dialogRef: MatDialogRef<EditableOpenArrayComponent>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.tableModified.subscribe((modification) => {
      this.modified.emit(modification);
    });
  }

  set open(open: boolean) {
    this.open2 = open;
    this.options = Object.assign({}, this.options, { save: true, close: true });

    if (open === true) {
      this.dialogRef = this.dialog.open(EditableOpenArrayComponent, {
        panelClass: 'table-dialog-container',
        width: '50vw',
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
