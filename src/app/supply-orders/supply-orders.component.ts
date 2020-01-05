import { Component, OnInit } from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';

import { TableOptions } from 'gdr-data-table';
import { SuppliesComponent } from '../supplies/supplies.component';

@Component({
  selector: 'app-supply-orders',
  templateUrl: './supply-orders.component.html',
  styleUrls: ['./supply-orders.component.scss']
})
export class SupplyOrdersComponent implements OnInit {
  supplyOrders: Promise<object[]>;
  tableOptions = new TableOptions();

  constructor(private crudService: CrudService) {
    this.supplyOrders = this.crudService.find('supply_order')
      .pipe(
        map(products => Lodash.sortBy(products, ['name']))
      ).toPromise();

    this.supplyOrders.then(res => console.log(res));

  }

  ngOnInit() {
    const suppliesOptions = new TableOptions();

    const options = [];

    this.crudService.find('supply').subscribe(supplies => {
      options.push(...supplies);
    });

    const map2 = (supply: any) => supply.name;
    const remap = (originalValue: any, mappedValue: any) => options.find(option => map2(option) === mappedValue);

    suppliesOptions.columnTypes = [
      { name: 'supply', type: 'Text', options: { map: map2, remap, options } },
      { name: 'quantity', type: 'Number' }
    ];

    suppliesOptions.cancel = false;

    this.tableOptions.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'deadLine', type: 'Date' },
      { name: 'supplies', type: 'Table', options: suppliesOptions },
      { name: 'arrived', type: 'Boolean' },
    ];
  }

  async onModification2(modification: any) {
    // if (modification.column === 'arrived') {
    //   const supplies = await this.crudService.find('supply').toPromise();
    //   for (const supply of (modification as any).row.supplies) {
    //     const supply2: any = Lodash.find(supplies, { name: supply.supply.name });

    //     let quantity = supply2.quantity;
    //     if (!modification.value) {
    //       quantity -= supply.quantity;
    //     } else {
    //       quantity += supply.quantity;
    //     }

    //     this.crudService.update('supply', { name: supply2.name }, { quantity });
    //   }
    // }

    // if (modification.value instanceof TableInsert) {
    //   modification.value.rows.supplyOrder = modification.row.name;
    // }

    // if (modification instanceof TableUpdate && modification.column !== 'supplies') {
    //   modification.row = { name: (modification.row as any).name };
    // }

    // if (modification.column === 'supplies') {
    //   this.crudService.modify('supplies_ordered', modification.value).then(result => console.log(result));
    // } else {
    //   this.crudService.modify('supply_order', modification).then(result => console.log(result));
    // }
  }

  async onModification(modification: any) {
    this.crudService.modify('supply_order', modification).then(result => console.log(result));
  }
}
