import { Component, OnInit } from '@angular/core';
// import { TableInfo, EditableType } from '../data-table/editable-value/editable-type';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';

import { TableOptions, TextOptions } from 'gdr-data-table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Promise<object[]>;

  productOptions = new TableOptions();

  constructor(private crudService: CrudService) {
    this.products = this.crudService.find('product')
      .pipe(
        map(products => Lodash.sortBy(products, ['name']))
      ).toPromise();

    this.products.then(product => console.log(product));
  }

  ngOnInit() {
    const phaseOptions = new TableOptions();
    const phaseNecessaryOptions = new TableOptions();
    const phaseSkillOptions = new TableOptions();
    const phaseToolOptions = new TableOptions();
    const parentPhaseOptions = new TableOptions();

    const supplyOptions = [];
    const toolOptions = [];
    const skillOptions = [];

    this.crudService.find('supply').subscribe(supplies => {
      supplyOptions.push(...supplies.map(supply => supply.name));
    });

    this.crudService.find('tool').subscribe(tools => {
      toolOptions.push(...tools.map(tool => tool.name));
    });

    this.crudService.find('skill').subscribe(skills => {
      skillOptions.push(...skills.map(skill => skill.name));
    });


    const map2 = (value: any) => value.name;

    phaseNecessaryOptions.columnTypes = [
      { name: 'supply', type: 'Text', options: { options: supplyOptions } },
      { name: 'quantity', type: 'Number' }
    ];
    phaseNecessaryOptions.cancel = false;


    phaseSkillOptions.columnTypes = [
      { name: 'skill', type: 'Text', options: { options: skillOptions } },
    ];
    phaseSkillOptions.cancel = false;

    phaseToolOptions.columnTypes = [
      { name: 'tool', type: 'Text', options: { options: toolOptions } },
      { name: 'count', type: 'Number' }
    ];
    phaseToolOptions.cancel = false;

    parentPhaseOptions.columnTypes = [
      { name: 'parent', type: 'Text' }
    ];
    parentPhaseOptions.cancel = false;

    phaseOptions.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'time', type: 'Text' },
      { name: 'skills', type: 'Table', options: phaseSkillOptions },
      { name: 'tools', type: 'Table', options: phaseToolOptions },
      { name: 'necessary', type: 'Table', options: phaseNecessaryOptions },
      { name: 'parentPhases', type: 'Table', options: parentPhaseOptions }
    ];
    phaseOptions.cancel = false;

    this.productOptions.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'phases', type: 'Table', options: phaseOptions }
    ];
  }

  onModification(modification: any) {
    this.crudService.modify('product', modification).then(result => console.log(result));
  }
}
