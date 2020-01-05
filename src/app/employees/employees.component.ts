import { Component, OnInit } from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';

import { TableOptions, TextOptions } from 'gdr-data-table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Promise<object[]>;
  options = new TableOptions();

  constructor(private crudService: CrudService) {
    this.employees = this.crudService.find('employee')
      .pipe(
        map(products => Lodash.sortBy(products, ['name']))
      ).toPromise();
    this.employees.then(res => console.log(res));
  }

  ngOnInit() {
    const skillsOptions = new TableOptions();

    const skillOptions = [];
    const shiftOptions = [];

    this.crudService.find('skill').subscribe(skills => {
      skillOptions.push(...skills);
    });

    this.crudService.find('shift').subscribe(shifts => {
      shiftOptions.push(...shifts);
    });

    const map2 = (skill: any) => skill.name;
    const remap = (originalValue: any, mappedValue: any) => skillOptions.find(skillOption => map2(skillOption) === mappedValue);

    skillsOptions.columnTypes = [
      { name: 'skill', type: 'Text', options: { map: map2, remap, options: skillOptions } },
    ];
    skillsOptions.cancel = false;

    const shiftOptions2: TextOptions = {
      map: shift => shift.name,
      remap: (originalValue: any, mappedValue: any) => shiftOptions.find(shiftOption => map2(shiftOption) === mappedValue),
      options: shiftOptions
    };

    const freeDaysOption = new TableOptions();
    freeDaysOption.columnTypes = [
      { name: 'startDate', type: 'Date' },
      { name: 'endDate', type: 'Date' },
    ];
    freeDaysOption.cancel = false;

    this.options.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'skills', type: 'Table', options: skillsOptions },
      { name: 'shift', type: 'Text', options: shiftOptions2 },
      { name: 'freeDays', type: 'Table', options: freeDaysOption },
    ];
  }

  async onModification(modification: any) {
    this.crudService.modify('employee', modification).then(result => console.log(result));
  }

}
