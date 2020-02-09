import { Component, OnInit } from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';
import { TableOptions } from 'gdr-data-table';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedule: Promise<object[]>;
  tableOptions = new TableOptions();
  scheduleForDayOptions = new TableOptions();

  constructor(private crudService: CrudService) {
    this.schedule = this.crudService.getSchedule().toPromise();
    this.schedule.then(sch => console.log(sch));
  }

  ngOnInit() {

    const scheduleForEmployeeOptions = new TableOptions();
    const scheduleForShiftOptions = new TableOptions();
    const scheduleOptions = new TableOptions();

    scheduleOptions.columnTypes = [
      { name: 'phase', type: 'Text' },
      { name: 'start', type: 'Text'},
      { name: 'end', type: 'Text'}
    ];

    scheduleForEmployeeOptions.columnTypes = [
      { name: 'employee', type: 'Text' },
      { name: 'schedule', type: 'Table', options: scheduleOptions }
    ];

    scheduleForShiftOptions.columnTypes = [
      { name: 'shift', type: 'Text' },
      { name: 'schedule', type: 'Table', options: scheduleForEmployeeOptions },
    ];

    this.scheduleForDayOptions.columnTypes = [
      { name: 'date', type: 'Date' },
      { name: 'schedule', type: 'Table', options: scheduleForShiftOptions },
    ];

  }

  onModification(modification: any) {

  }
}
