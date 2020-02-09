import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output, EventEmitter } from '@angular/core';
import { EditableValueComponent } from '../editable-value/editable-value.component';
import { TableOptions, EditableType, ObjectOptions, ColumnType, PropertyType } from '../editable-value/editable-type';
import { MatTableDataSource, MatTable, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import * as Lodash from 'lodash';
import { EditableOpenObjectComponent } from '../editable-value/editable-object/editable-open-object/editable-open-object.component';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

export class TableModification {
  type: 'insert' | 'update' | 'delete';
  modification: any;
}

@Component({
  selector: 'gdr-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChildren('editableValue') editableValues: QueryList<any>;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Input() options: TableOptions;
  @Input() valueConfirmed: Observable<boolean>;

  @Output() modified = new EventEmitter<TableModification>();
  @Output() save = new EventEmitter<object[]>();
  @Output() cancel = new EventEmitter<object[]>();

  updateValue: { row: any, column: any, value: any };
  insertValue: any;


  defaultOptions: TableOptions;
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  constructor(public dialog: MatDialog, public router: Router) {
    this.defaultOptions = {
      filter: true,
      pagination: true,
      editDisabled: false,
      select: true,
      insert: true,
      delete: true,
      cancel: false,
      save: false,
      hiddenColumns: [],
    };
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    setTimeout(() => this.dataSource.paginator = this.paginator, 0);

    (this.options as Promise<TableOptions>).then(options => this.options = Object.assign({}, this.defaultOptions, options));


    if (!this.valueConfirmed) {
      this.valueConfirmed = new Observable<any>();
    }

    this.valueConfirmed.subscribe(() => {
      if (this.updateValue) {
        this.updateValue.row[this.updateValue.column] = this.updateValue.value;
      } else if (this.insertValue) {
        this.dataSource.data.unshift(this.insertValue);
      }
      this.updateValue = this.insertValue = undefined;
      this.dataSource.data = this.dataSource.data;
    });
  }

  @Input() set data(data: any) {
    data = Promise.resolve(data);
    data.then((data2: object[]) => {
      this.dataSource.data = data2 === undefined ? [] : data2;
      // this.initializeTypes();
    });
  }

  get data() {
    return this.dataSource.data;
  }

  initializeTypes() {

    const getType = (value: any): EditableType => {
      let type: EditableType;

      if (typeof value === 'number') {
        type = 'Number';
      } else if (typeof value === 'string') {
        type = 'Text';
      } else if (typeof value === 'boolean') {
        type = 'Boolean';
      } else if (value instanceof Date) {
        type = 'Date';
      } else if (Lodash.isArray(value)) {
        for (const value2 of value) {
          if (value2) {
            if (Lodash.isObject(value2) && !(value2 instanceof Date)) {
              type = 'Table';
            } else {
              type = 'Array';
            }
            break;
          }
        }

      } else if (value instanceof Object) {
        type = 'Object';
      }

      return type;
    };

    const getTypes = (values: any[]): ColumnType[] => {
      const types: ColumnType[] = [];

      for (const value of values) {
        if (getType(value) !== 'Object') {
          if (types.length === 0 && getType(value) !== undefined) {
            types.push({ name: 'name', type: getType(value) });
          }
        } else {
          Lodash.forOwn(value, (element, key) => {
            const type = { name: key, type: getType(element), options: {} };

            if (type.type === 'Object') {
              (type.options as ObjectOptions).propertyTypes =
                getTypes(values.reduce((accumulator, currentValue) => {
                  accumulator.push(currentValue[type.name]);
                  return accumulator;
                }, []));
            } else if (type.type === 'Table' || type.type === 'Array') {
              (type.options as TableOptions).columnTypes =
                getTypes(values.reduce((accumulator, currentValue) => {
                  accumulator.push(...currentValue[type.name]);
                  return accumulator;
                }, []));
            }
            if (!Lodash.find(types, (type2) => type2.name === type.name) && type.type !== undefined) {
              types.push(type);
            }
          });
        }
      }

      return types;
    };

    const mergeTypes = (userTypes: ColumnType[], inferredTypes: ColumnType[]) => {
      for (const userType of userTypes) {
        const inferredType = Lodash.find(inferredTypes, (inferredType2) => inferredType2.name === userType.name);

        if (!userType.options) {
          userType.options = {};
        }

        if (!inferredType) {
          continue;
        }

        if (userType.type === 'Table' || userType.type === 'Array') {
          if (!(userType.options as TableOptions).columnTypes) {
            (userType.options as TableOptions).columnTypes = [];
          }
          mergeTypes((userType.options as TableOptions).columnTypes, (inferredType.options as TableOptions).columnTypes);
        } else if (userType.type === 'Object') {
          if (!(userType.options as ObjectOptions).propertyTypes) {
            (userType.options as ObjectOptions).propertyTypes = [];
          }
          mergeTypes((userType.options as ObjectOptions).propertyTypes, (inferredType.options as ObjectOptions).propertyTypes);
        }
      }

      const diff = Lodash.differenceWith(inferredTypes as ColumnType[], userTypes, (a, b) => a.name === b.name);
      userTypes.push(...diff);
    };

    // mergeTypes(this.options.columnTypes as ColumnType[], getTypes(this.dataSource.data));
  }

  onCellClick(editableValue: EditableValueComponent, column: string) {
    const options = this.options as TableOptions;
    if (
      this.openedEditableValue === undefined &&
      options.editDisabled !== true &&
      (options.editDisabled === false || (options.editDisabled as any).indexOf(column) > -1)
    ) {
      editableValue.open = true;
    }

  }

  onUpdate(row: object, column: string, value: any) {
    const update = {
      type: 'update' as any,
      modification: { row: Lodash.clone(row), column, value }
    };

    // row[column] = value;
    this.modified.emit(update);
  }

  onInsert() {
    const options = this.options as TableOptions;

    const dialogRef = this.dialog.open(EditableOpenObjectComponent, {
      width: '320px',
      data: { value: {}, options: { propertyTypes: options.columnTypes }, title: 'Insert' },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.insertValue = result;
        this.modified.emit({ type: 'insert', modification: result });
      }
    });
  }

  onDelete() {
    this.selection.selected.forEach((selected: object) => {
      this.dataSource.data.splice(this.dataSource.data.indexOf(selected), 1);
    });

    this.modified.emit({ type: 'delete', modification: this.selection.selected });

    this.selection.clear();
    this.dataSource.data = this.dataSource.data;

    console.log(this.dataSource.data);
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

  get columnsWithSelect() {
    if (!this.options.columnTypes) {
      return;
    }

    const options = this.options as TableOptions;
    const columns = options.columnTypes.map(columnInfo => columnInfo.name);

    if (options.select) {
      columns.unshift('select');
    }

    if (options.hiddenColumns) {
      Lodash.remove(columns, (column) => options.hiddenColumns.find((hiddenColumn) => column === hiddenColumn) !== undefined);
    }

    return columns;
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

  getValue(column: ColumnType, element: any) {
    if (column.type === 'Table' && element[column.name] === undefined) {
      return element[column.name] = [];
    }
    const x = element[column.name];
    return x;
  }

  refresh(data: any) {
    // const d1 = Lodash.differenceWith(data, this.data, Lodash.isEqual);
    // const d2 = Lodash.differenceWith(this.data, data, Lodash.isEqual);

    // if (this.openedEditableValue && this.openedEditableValue.type === 'Table') {
    //   Lodash.forIn(d2[0], (value, key) => {
    //     if (Lodash.isEqual(value, this.openedEditableValue.value)) {
    //       this.dialog.openDialogs.forEach(dialog => {
    //         dialog.componentInstance.table.data = d1[0][key];
    //       });
    //     }
    //   });
    // } else {
    //   this.data = data;
    // }
  }

}

