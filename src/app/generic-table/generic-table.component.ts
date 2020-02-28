import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as lodash from 'lodash';
import { CrudService } from '../services/crud.service';
import { TableOptions } from '../data-table/editable-value/editable-type';
import { TableModification } from 'gdr-data-table';


@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  table: string;
  data: Promise<any>;
  options: Promise<any>;
  clientDbMap: { dbValue: any, clientValue: any }[] = [];

  constructor(private route: ActivatedRoute, private crudService: CrudService) {

  }

  async ngOnInit() {
    this.data = new Promise(resolve => {
      this.route.paramMap.subscribe(paramMap => {
        this.table = paramMap.get('table');
        this.crudService.find(this.table).subscribe(res => {
          resolve(res);
        });
      });
    });

    this.options = new Promise(resolve => {
      this.route.paramMap.subscribe(paramMap => {
        this.table = paramMap.get('table');
        this.crudService.getTypes(this.table).subscribe(res => {
          resolve({ columnTypes: res, clientDbMap: this.clientDbMap });
        });
      });
    });

    this.options.then(options => {
      const setTableOptions = (options2: TableOptions) => {
        options2.clientDbMap = this.clientDbMap;
        options2.close = true;

        for (const columnType of options2.columnTypes) {
          if (columnType.type === 'table' && (columnType.options as any).clientDbMap === undefined) {
            setTableOptions((columnType as any).options);
          }
        }
      };

      setTableOptions(options);
      options.close = false;
    });

    const data = await this.data;
    this.initClientDbMap(data, lodash.cloneDeep(data));
  }

  initClientDbMap(clientData: any[], dbData?: any[]) {
    for (let i = 0; i < clientData.length; i++) {
      this.clientDbMap.push({ dbValue: dbData[i], clientValue: clientData[i] });

      lodash.forOwn(clientData[i], (value: any, prop: any) => {
        if (lodash.isArray(value)) {
          this.initClientDbMap(value, dbData[i][prop]);
        }
      });
    }
  }

  getLastModification(mod: TableModification): TableModification {
    if (mod.type === 'update' && mod.modification.value.type !== undefined) {
      return this.getLastModification(mod.modification.value);
    }
    return mod;
  }

  modifyDbValue(modification: any) {
    const type = modification.type;
    const mod = modification.modification;

    if (type === 'update' && mod.value.type) {
      this.modifyDbValue(mod.value);
      return;
    }

    switch (type) {
      case 'update':
        const dbValue = this.clientDbMap.find(value => value.dbValue === mod.row).dbValue;
        dbValue[mod.column] = mod.value;
        break;
      case 'insert':
        this.clientDbMap.push({ dbValue: lodash.cloneDeep(mod), clientValue: mod });
        break;
      case 'delete': // change in the future to value.dbValue
        lodash.remove(this.clientDbMap, value => mod.find((m: any) => m === value.clientValue) !== undefined);
        break;
      default:
        break;
    }

  }



  cloneModification(tableModification: TableModification) {
    const type = tableModification.type;
    const mod = tableModification.modification;

    if (type === 'update' && mod.value.type) {
      return { type, modification: { row: mod.row, column: mod.column, value: this.cloneModification(mod.value) } };
    }

    if (type === 'update') {
      return { type, modification: { row: mod.row, column: mod.column, value: mod.value } };
    }

    return { type, modification: mod };
  }

  replaceRow(tableModification: any) {
    const type = tableModification.type;
    const modification = tableModification.modification;

    if (type === 'update') {
      let dbValue = this.clientDbMap.find(cdm => cdm.clientValue === modification.row);
      dbValue = dbValue ? dbValue.dbValue : modification.row;

      let value = modification.value;

      if (modification.value.type) {
        value = this.replaceRow(modification.value);
      }

      if (!value && !dbValue) {
        return undefined;
      }

      return { type, modification: { row: dbValue, column: modification.column, value } };
    }

    return { type, modification };
  }

  updateToInsert(tableModification: TableModification) {
    if (!tableModification) {
      return undefined;
    }

    const modification = this.cloneModification(tableModification);
    const lastModification = this.getLastModification(modification);

    if (lastModification.type === 'update') {
      const clientDbMap = this.clientDbMap.find(value => value.clientValue === lastModification.modification.row);
      if (!clientDbMap) {
        lastModification.type = 'insert';
        lastModification.modification = lastModification.modification.row;
      }
    }

    return modification;
  }

  insertChildValues(tableModification: TableModification) {
    const modification = this.updateToInsert(this.cloneModification(tableModification));
    const lastmod = this.getLastModification(modification);

    if (lastmod.type === 'insert') {
      const insertedRow = lastmod.modification;
      lodash.forOwn(insertedRow, async (value, key) => {
        if (lodash.isArray(value)) {
          for (const row of value) {
            lastmod.type = 'update';
            lastmod.modification = { row: insertedRow, column: key, value: { type: 'insert', modification: row } };
            await this.modified(this.cloneModification(modification));
          }
        }
      });
    }
  }

  async modified(modification: TableModification) {
    const updateReplaced = this.updateToInsert(this.cloneModification(modification));
    const replaced = this.replaceRow(updateReplaced);

    if (replaced && await this.crudService.modify(this.table, replaced)) {
      this.modifyDbValue(replaced);
      this.insertChildValues(updateReplaced);
    }
  }
}
