import { Component, OnInit, ViewChild } from '@angular/core';
import { TableInfo, EditableType } from '../data-table/editable-value/editable-type';
import { TableChange } from '../data-table/data-table/data-table.component';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataTableComponent } from 'gdr-data-table';
import { GenericCrud } from '../generic-crud';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends GenericCrud implements OnInit {
  productTableInfo = new TableInfo();
  products = [];
  tableNames = new Map<string, string>([['main', 'product']]);
  supplyOptions = [];

  @ViewChild('table', { static: true }) table: DataTableComponent;

  constructor(protected crudService: CrudService) {
    super(
      new Map<string, string>([['main', 'product'], ['necessary', 'necessary']]),
      new Map<string, string>([['necessary', 'product']]),
      crudService
    );

    this.crudService.find('supply').subscribe(supplies => {
      for (const supply of supplies) {
        this.supplyOptions.push(supply);
      }
    });

    this.crudService.find('product').subscribe(products => {
      Lodash.sortBy(products, ['name']);
      for (const product of products) {
        this.products.push(product);
      }
      this.table.dataSource.data = this.table.dataSource.data;
    });

    const necessaryInfo = new TableInfo();
    necessaryInfo.displayedColumns = ['supply', 'quantity'];
    necessaryInfo.columnNames = new Map<string, string>([['supply', 'Supply'], ['quantity', 'Quantitiy']]);
    necessaryInfo.columnTypes = new Map<string, EditableType>([
      ['supply', { name: 'AutocompleteMap', info: { options: this.supplyOptions, map: (value) => value.name } }],
      ['quantity', { name: 'Number' }]
    ]);

    this.productTableInfo.displayedColumns = ['name', 'necessary'];
    this.productTableInfo.columnNames = new Map([
      ['name', 'Name'],
      ['necessary', 'Necessary'],
    ]);
    this.productTableInfo.columnTypes = new Map<string, EditableType>([
      ['name', { name: 'String' }],
      ['necessary', { name: 'Table', info: necessaryInfo }],
    ]);

    // this.products = this.crudService.find('product')
    //   .pipe(
    //     map(products => Lodash.sortBy(products, ['name']))
    //   );
  }

  ngOnInit() {
    
  }

  onChange(tableChange: TableChange) {
    console.log(tableChange);
    this.onTableChange(tableChange);
  }


}
