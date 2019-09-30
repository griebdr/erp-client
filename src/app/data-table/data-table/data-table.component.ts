import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output, EventEmitter, ElementRef, AfterViewInit, ComponentRef } from '@angular/core';
import { EditableValueComponent } from '../editable-value/editable-value.component';
import { TableInfo, TableModification } from '../editable-value/editable-type';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as Lodash from 'lodash';
import { TableInsertComponent } from '../table-insert/table-insert.component';


export class TableChange {
  type: 'insert' | 'delete' | 'update';
  position: { row: object, column: string }[];
  value: any;
}

export class TableFeatures {
  sort?: boolean;
  filter?: boolean;
  edit?: boolean;
  select?: boolean;
  insert?: boolean;
  delete?: boolean;
  close?: boolean;
  save?: boolean;
  header?: boolean;
  pagination?: boolean;
}

export class TableUpdate {
  row: object;
  column: string;
  value: any;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChildren('editableValue') editableValues: QueryList<any>;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() data: object[] | Promise<object[]>;
  @Input() tableInfo: TableInfo;

  @Output() insert = new EventEmitter<object>();
  @Output() delete = new EventEmitter<object[]>();
  @Output() update = new EventEmitter<TableUpdate>();

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<object[]>();

  defaultFeatures: TableFeatures;
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog) {
    this.defaultFeatures = {
      sort: true,
      filter: true,
      pagination: true,
      edit: true,
      select: true,
      insert: true,
      delete: true,
      close: false,
      save: false,
      header: true,
    };
  }

  ngOnInit() {
    this.data = Promise.resolve(this.data);

    this.data.then((data) => {
      if (data === undefined) {
        this.dataSource.data = [];
      } else {
        this.dataSource.data = Lodash.cloneDeep(data);
      }
    });

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.tableInfo.features = Object.assign({}, this.defaultFeatures, this.tableInfo.features);
  }

  onCellClick(editableValue: EditableValueComponent) {
    if (this.openedEditableValue === undefined) {
      editableValue.open = true;
    }
  }

  onUpdate(row: object, column: string, value: any) {
    this.update.emit({ row: Lodash.cloneDeep(row), column: column, value: value });
    row[column] = value;
  }

  onInsert() {
    const dialogRef = this.dialog.open(TableInsertComponent, {
      width: '320px',
      data: this.tableInfo,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dataSource.data.unshift(result);
        this.insert.emit(result);
      }
      this.dataSource.data = this.dataSource.data;
    });
  }

  onDelete() {
    this.selection.selected.forEach((selected: object) => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(selected), 1);
    });

    this.delete.emit(this.selection.selected);

    this.selection.clear();
    this.dataSource.data = this.dataSource.data;
  }

  onModification(element: object, column: string, value: any) {
    this.update.emit({ row: element, column: column, value: value });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  get columnsWithSelect() {
    const data = Lodash.clone(this.tableInfo.displayedColumns);
    if (this.tableInfo.features.select) {
      data.unshift('select');
    }
    return data;
  }

  get openedEditableValue(): any {
    let editableValue2: any;

    this.editableValues.forEach(editableValue => {
      if (editableValue.open === true) {
        editableValue2 = editableValue;
      }
    });

    return editableValue2;
  }


  getDataSource() {
    console.log('abc');
    return new MatTableDataSource([]);
  }

}

