import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output, EventEmitter } from '@angular/core';
import { EditableValueComponent } from '../editable-value/editable-value.component';
import { TableOptions, EditableType, ObjectOptions, ColumnType, PropertyType } from '../editable-value/editable-type';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as lodash from 'lodash';

export class TableModification {
  type: 'insert' | 'update' | 'delete';
  modification: any;
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
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() options: Promise<TableOptions>;
  @Input() data: Promise<any[]>;

  @Output() modified = new EventEmitter<TableModification>();
  @Output() save = new EventEmitter<object[]>();
  @Output() cancel = new EventEmitter<object[]>();

  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  resolvedOptions: TableOptions;

  constructor(public dialog: MatDialog) {

  }

  async ngOnInit() {
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource.paginator = this.paginator);

    this.data = Promise.resolve(this.data);
    this.options = Promise.resolve(this.options);

    Promise.all([this.data, this.options]).then((res) => {
      this.resolvedOptions = res[1];
      this.dataSource.data = res[0] === undefined ? [] : res[0];
      this.sort.sort({ id: res[1].columnTypes[0].name, start: 'asc', disableClear: true });
    });

    this.dataSource.data = this.dataSource.data;
  }

  onCellClick(editableValue: EditableValueComponent, column: string) {
    if (this.openedEditableValue === undefined) {
      editableValue.open = true;
    }
  }

  onUpdate(row: object, column: string, value: any) {
    row[column] = value;

    const update = {
      type: 'update' as any,
      modification: { row, column, value }
    };

    if (this.resolvedOptions.columnTypes.find((columnType) => columnType.name === column).type !== 'table') {
      this.modified.emit(update);
    }
  }

  onInsert() {
    this.dataSource.data.unshift({});
    this.dataSource.data = this.dataSource.data;
  }

  onDelete() {
    this.selection.selected.forEach((selected: object) => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(selected), 1);
    });

    this.modified.emit({ type: 'delete', modification: this.selection.selected });
    this.selection.clear();
    this.dataSource.data = this.dataSource.data;
  }

  onModification(row: object, column: string, modification: any) {
    this.modified.emit({ type: 'update', modification: { row, column, value: modification } });
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


  get openedEditableValue(): any {
    let editableValue2: any;

    this.editableValues.forEach(editableValue => {
      if (editableValue.open === true) {
        editableValue2 = editableValue;
      }
    });

    return editableValue2;
  }

  get columnsWithSelect() {
    if (!this.resolvedOptions) {
      return [];
    }

    const columnsWithSelect = this.resolvedOptions.columnTypes.map(columnInfo => columnInfo.name);
    columnsWithSelect.unshift('select');

    return columnsWithSelect;
  }

  isMissmatch(row: any, column: string) {
    const dbClientMap = this.resolvedOptions.clientDbMap;

    if (dbClientMap) {
      const dcm = dbClientMap.find(value => value.clientValue === row);

      if (!dcm) {
        return false;
      }

      if (!lodash.isEqual(dcm.dbValue[column], row[column])) {
        // console.log(dcm.dbValue[column], row[column]);
      }

      return !lodash.isEqualWith(row[column], dcm.dbValue[column], this.myIsEqual);
    }

    return false;
  }

  myIsEqual = (a: any, b: any) => {
    if (this.resolvedOptions && lodash.isArray(a)) {      
      for (const value of a) {
        const c = this.resolvedOptions.clientDbMap.find(value2 => value2.clientValue === value);
        if (!c || !lodash.isEqualWith(c.clientValue, c.dbValue, this.myIsEqual)) {
          return false;
        }
      } 
      return true;
    }
  }

  isRowMissmatch(row: any) {
    const dbClientMap = this.resolvedOptions.clientDbMap;

    if (dbClientMap) {
      const dcm = dbClientMap.find(value => value.clientValue === row);

      if (!dcm) {
        return true;
      }
    }

    return false;
  }
}

