import { Component, OnInit} from '@angular/core';
import * as Lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { map } from 'rxjs/operators';
import { TableOptions } from 'gdr-data-table';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  tools: Promise<object[]>;
  options = new TableOptions();

  constructor(private crudService: CrudService) {
    this.tools = this.crudService.find('tool')
      .pipe(
        map(tools => Lodash.sortBy(tools, ['name']))
      ).toPromise();
  }

  ngOnInit() {
    this.options.columnTypes = [
      { name: 'name', type: 'Text' },
      { name: 'count', type: 'Number' },
    ];
  }

  onModification(modification: any) {
    this.crudService.modify('tool', modification).then(result => console.log(result));
  }
}
