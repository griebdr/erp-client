import { Component, OnInit, ViewChild } from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';
import { TableOptions } from '../data-table/editable-value/editable-type';


@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent implements OnInit {
  supplies: Promise<object[]>;
  options: Promise<TableOptions>;

  @ViewChild('table', { static: false }) table: any;

  constructor(private crudService: CrudService) {
    this.supplies = this.crudService.find('supply')
      .pipe(
        map(supplies => Lodash.sortBy(supplies, ['name']))
      ).toPromise();
  }

  async ngOnInit() {
    // this.options.columnTypes = [
    //   { name: 'name', type: 'Text' },
    //   { name: 'quantity', type: 'Number' }
    // ];

    this.options = new Promise(async resolve => resolve({ columnTypes: await this.crudService.getTypes('supply').toPromise() }));

  }

  async onModification(modification: any) {
    if (!await this.crudService.modify('supply', modification)) {
      this.crudService.find('supply')
        .pipe(
          map(supplies => Lodash.sortBy(supplies, ['name']))
        ).subscribe(supplies => {
          this.table.refresh(supplies);
        });
    }
  }

}
