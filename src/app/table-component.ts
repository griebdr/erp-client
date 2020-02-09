import { ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import * as lodash from 'lodash';
import { CrudService } from './services/crud.service';

export class TableComponent {
  elements: any;

  @ViewChild('table', { static: false }) table: any;

  constructor(public crudService: CrudService, public tableName: string, public orderColumn: string) {
    this.elements = this.crudService.find(this.tableName)
      .pipe(
        map(products => lodash.sortBy(products, [this.orderColumn]))
      ).toPromise();
  }

  async onModification(modification: any) {
    const success = await this.crudService.modify(this.tableName, modification);

    if (!success) {
      this.crudService.find(this.tableName).pipe(
        map(data => lodash.sortBy(data, [this.orderColumn]))
      ).subscribe(data => {
        this.table.data = data;
      });
    }
  }
}
