import { Component, OnInit, ViewChild } from '@angular/core';
import { TableInfo, EditableType } from '../data-table/editable-value/editable-type';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productTableInfo = new TableInfo();
  products = [];
  supplyOptions = [];

  @ViewChild('table', { static: true }) table: any;

  constructor(protected crudService: CrudService) {
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
      ['name', { name: 'Text' }],
      ['necessary', { name: 'Table', info: necessaryInfo }],
    ]);
  }

  ngOnInit() {
    
  }




}
