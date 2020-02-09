import { Component, OnInit, Inject, Input, ViewChildren, QueryList } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ObjectOptions, EditableType } from '../../editable-type';
import EditableValue from '../../editable-value';
import * as Lodash from 'lodash';
import { Subject } from 'rxjs';

export class ObjectModification {
  constructor(private property: string, private value: any) { }
}

interface DialogData {
  value: object;
  modified: Subject<ObjectModification>;
  options: ObjectOptions;
  title: string;
}


@Component({
  selector: 'gdr-editable-open-object',
  templateUrl: './editable-open-object.component.html',
  styleUrls: ['./editable-open-object.component.scss']
})
export class EditableOpenObjectComponent implements OnInit {
  value = {};

  @ViewChildren('editableValue') editableValues: QueryList<any>;

  constructor(
    public dialogRef: MatDialogRef<EditableOpenObjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit(): void {
    if (this.data.value === undefined) {
      this.value = {};
    } else {
      this.value = Lodash.cloneDeep(this.data.value);
    }
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

  onSave(property: string, value: any) {
    this.value[property] = value;
    if (this.data.modified) {
      this.data.modified.next(new ObjectModification(property, value));
    }
  }

  onModification(property: string, event: any) {
    if (this.data.modified) {
      this.data.modified.next(new ObjectModification(property, event));
    }
  }

}
