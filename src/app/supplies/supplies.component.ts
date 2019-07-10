import { Component, OnInit } from '@angular/core';
import { TableInfo, EditableType } from '../data-table/editable-value/editable-type';
import { TableChange } from '../data-table/data-table/data-table.component';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent implements OnInit {
  tableInfo = new TableInfo();
  supplies: Observable<object[]>;
  tableNames = new Map<string, string>([['main', 'supply']]);

  constructor(private crudService: CrudService) {
    this.tableInfo.displayedColumns = ['name', 'quantity'];
    this.tableInfo.columnNames = new Map([
      ['name', 'Name'],
      ['quantity', 'Quantity'],
    ]);
    this.tableInfo.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'String' }],
      ['quantity', { name: 'Number' }],
    ]);

    this.supplies = this.crudService.find('supply')
      .pipe(
        map(supplies => Lodash.sortBy(supplies, ['name']))
      );

  }

  ngOnInit() {

  }

  onTableChange(tableNames: Map<string, string>, tableChange: TableChange) {
    this.crudService.makeChanges(tableNames, tableChange);
  }



}
