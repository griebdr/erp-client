import { Component, OnInit, ViewChild } from '@angular/core';
import { TableInfo, EditableType } from '../data-table/editable-value/editable-type';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map, startWith } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { DataTableComponent } from 'gdr-data-table';


@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent implements OnInit {
  @ViewChild('table', { static: true }) table: DataTableComponent;

  tableInfo = new TableInfo();
  supplies: Promise<object[]>;
  tableNames = new Map<string, string>([['main', 'supply']]);

  didSave = new Subject<boolean>();

  constructor(private crudService: CrudService) {
    this.tableInfo.displayedColumns = ['name', 'quantity'];
    this.tableInfo.columnNames = new Map([
      ['name', 'Name'],
      ['quantity', 'Quantity'],
    ]);
    this.tableInfo.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'Text' }],
      ['quantity', { name: 'Number' }],
    ]);

    this.supplies = this.crudService.find('supply')
      .pipe(
        map(supplies => Lodash.sortBy(supplies, ['name']))
      ).toPromise();
  }

  ngOnInit() {

  }

  async onUpdate(update: any) {
    const result = await this.crudService.update('supply', { name: update.row['name'] }, { [update.column]: update.value });
    if (result === true) {
      this.didSave.next(true);
    }
  }

  async onDelete(deletion: any) {
    const result = await this.crudService.delete('supply', deletion);
    if (result === true) {
      this.didSave.next(true);
    }
  }

  async onInsert(insertion: any) {
    const result = await this.crudService.insert('supply', insertion);
    if (result === true) {
      this.didSave.next(true);
    }
  }

}
