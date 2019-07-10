import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output, EventEmitter } from '@angular/core';
import { EditableValueComponent, ValueUpdate } from '../editable-value/editable-value.component';
import { TableInfo } from '../editable-value/editable-type';
import { MatTableDataSource, MatTable, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as Lodash from 'lodash';
import { Observable } from 'rxjs';

export class TableChange {
  type: 'insert' | 'delete' | 'update';
  position: { row: object, column: string }[];
  value: any;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() data: object[];
  @Input() tableInfo: TableInfo;

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  @ViewChildren(EditableValueComponent) editableValues: QueryList<EditableValueComponent>;
  @Output() tableChange = new EventEmitter<TableChange>();


  initialValues: Map<string, any>;

  constructor() {
    this.initialValues = new Map<string, any>([
      ['String', ''],
      ['Number', 0],
      ['Date', new Date()],
      ['Autocomplete', ''],
      ['Table', []]
    ]);
  }

  ngOnInit() {
    if (this.data === undefined) {
      this.dataSource = new MatTableDataSource<any>([]);
    } else {
      this.dataSource = new MatTableDataSource<any>(this.data);
    }

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.initializeData(this.dataSource.data);

  }

  initializeData(data: object[]) {
    const props = this.tableInfo.displayedColumns;

    for (const element of data) {
      for (const prop of props) {
        if (element[prop] === undefined) {
          element[prop] = this.initialValues.get(this.tableInfo.columnTypes.get(prop).name);
        }
      }
    }
  }

  onCellClick(event: Event, value: EditableValueComponent) {
    let isAllClosed = true;
    this.editableValues.forEach(editableValue => {
      if (editableValue.open) {
        isAllClosed = false;
      }
    });

    if (isAllClosed) {
      value.open = true;
      event.stopPropagation();
    }
  }

  insert() {
    const tableChange = new TableChange;
    tableChange.position = [];
    tableChange.value = {};
    this.initializeData([tableChange.value]);
    tableChange.type = 'insert';

    this.dataSource.data.unshift(tableChange.value);
    this.tableChange.emit(tableChange);
    this.dataSource.data = this.dataSource.data;
  }

  delete() {
    const tableChange = new TableChange();
    tableChange.value = this.selection.selected;
    tableChange.position = [];
    tableChange.type = 'delete';

    this.selection.selected.forEach((selected: object) => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(selected), 1);
    });

    this.tableChange.emit(tableChange);
    this.selection.clear();

    this.dataSource.data = this.dataSource.data;
  }

  valueChanged = (element: object, column: string, change: any) => {
    if (change instanceof TableChange) {
      console.log('tablechange');
      change.position.unshift({ row: element, column: column });
      this.tableChange.emit(change);
    } else if (change instanceof ValueUpdate) {
      const tableChange = new TableChange();
      tableChange.type = 'update';
      tableChange.position = [{ row: element, column: column }];
      tableChange.value = change;

      element[column] = change.toValue;
      this.tableChange.emit(tableChange);
    }
  }

  makeChanges(tableChange: TableChange) {
    let data = this.dataSource.data;

    tableChange.position.forEach((position, index) => {
      const i = data.indexOf(position.row);
      const row = data[i];
      if (tableChange.type === 'update' && index === tableChange.position.length - 1) {
        data = row;
      } else {
        data = row[position.column];
      }
    });

    switch (tableChange.type) {
      case 'insert':
        if (data.indexOf(tableChange.value) === -1) {
          data.push(tableChange.value);
        }
        break;
      case 'delete':
        tableChange.value.forEach((selected: object) => {
          const index = data.indexOf(selected);
          if (index > -1) {
            this.dataSource.data.splice(index, 1);
          }
        });
        break;
      case 'update':
        data[tableChange.position[tableChange.position.length - 1].column] = tableChange.value;
        break;

      default:
        break;
    }

    this.dataSource.data = this.dataSource.data;
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
    data.unshift('select');
    return data;
  }

}

