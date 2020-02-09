import { Component, OnInit, ViewChild } from '@angular/core';
// import { TableInfo, EditableType } from '../data-table/editable-value/editable-type';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';

import { TableOptions, TextOptions } from 'gdr-data-table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import * as lodash from 'lodash';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Promise<object[]>;

  productOptions = new TableOptions();
  valueConfirmed = new Subject<void>();

  @ViewChild('table', { static: false }) table: any;

  constructor(private crudService: CrudService, private dialog: MatDialog) {
    this.products = this.crudService.find('product')
      .pipe(
        map(products => Lodash.sortBy(products, ['name']))
      ).toPromise();
  }

  ngOnInit() {
    const phaseOptions = new TableOptions();
    const phaseNecessaryOptions = new TableOptions();
    const phaseSkillOptions = new TableOptions();
    const phaseToolOptions = new TableOptions();
    const phaseDependecyOptions = new TableOptions();

    const supplyOptions = [];
    const toolOptions = [];
    const skillOptions = [];
    const phaseOptions2 = [];

    this.crudService.find('supply').subscribe(supplies => {
      supplyOptions.push(...supplies);
    });

    this.crudService.find('tool').subscribe(tools => {
      toolOptions.push(...tools);
    });

    this.crudService.find('skill').subscribe(skills => {
      skillOptions.push(...skills);
    });

    this.crudService.find('product').subscribe(products => {
      phaseOptions2.push(...lodash.flatMap(products, product => product.phases));
    });

    const map2 = (supply: any) => supply.name;
    let remap = (originalValue: any, mappedValue: any) => supplyOptions.find(option => map2(option) === mappedValue);

    phaseNecessaryOptions.columnTypes = [
      { name: 'supply', type: 'Text', options: { map: map2, remap, options: supplyOptions } },
      { name: 'quantity', type: 'Number' }
    ];
    phaseNecessaryOptions.cancel = true;

    remap = (originalValue: any, mappedValue: any) => skillOptions.find(option => map2(option) === mappedValue);
    phaseSkillOptions.columnTypes = [
      { name: 'skill', type: 'Text', options: { options: skillOptions, map: map2, remap } },
    ];
    phaseSkillOptions.cancel = true;

    remap = (originalValue: any, mappedValue: any) => toolOptions.find(option => map2(option) === mappedValue);
    phaseToolOptions.columnTypes = [
      { name: 'tool', type: 'Text', options: { options: toolOptions, map: map2, remap } },
      { name: 'count', type: 'Number' }
    ];
    phaseToolOptions.cancel = true;

    phaseDependecyOptions.columnTypes = [
      { name: 'dependency', type: 'Text' }
    ];
    phaseDependecyOptions.cancel = true;

    phaseOptions.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'time', type: 'Text' },
      { name: 'count', type: 'Number' },
      { name: 'skills', type: 'Table', options: phaseSkillOptions },
      { name: 'tools', type: 'Table', options: phaseToolOptions },
      { name: 'necessary', type: 'Table', options: phaseNecessaryOptions },
      { name: 'phaseDependencies', type: 'Table', options: phaseDependecyOptions }
    ];
    phaseOptions.cancel = true;

    this.productOptions.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'phases', type: 'Table', options: phaseOptions }
    ];
  }

  async onModification(modification: any) {
    const accepted = await this.crudService.modify('product', modification);
    if (accepted) {
      console.log('confiremd');
      this.valueConfirmed.next();
    }

    // .pipe(
    //   map(products => Lodash.sortBy(products, ['name']))
    // ).toPromise();
    // if (!await this.crudService.modify('product', modification)) {
    //   this.dialog.closeAll();
    // }
  }
}
