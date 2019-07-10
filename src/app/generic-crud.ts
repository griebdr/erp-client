import * as Lodash from 'lodash';
import { CrudService } from './services/crud.service';
import { TableChange } from './data-table/data-table/data-table.component';

export class GenericCrud {
  insertCandidatas = new Map<string, object[]>();

  constructor(
    public tableNames: Map<string, string>,
    public columnToFill: Map<string, string>,
    protected crudService?: CrudService,
  ) {
    tableNames.forEach(tableName => {
      this.insertCandidatas.set(tableName, []);
    });
  }

  async onTableChange(tableChange: TableChange) {
    const tcpLength = tableChange.position.length;

    if (tableChange.type === 'insert') {
      const insertTableName = tcpLength === 0 ?
        this.tableNames.get('main') :
        this.tableNames.get(tableChange.position[tcpLength - 1].column);

      if (tcpLength > 0) {
        tableChange.value[this.columnToFill.get(tableChange.position[tcpLength - 1].column)]
          = tableChange.position[tcpLength - 2].row;
      }

      const result = await this.crudService.insert(insertTableName, tableChange.value);
      if (result.success === true) {
        Lodash.remove(this.insertCandidatas.get(insertTableName), tableChange.value);
      } else {
        this.insertCandidatas.get(insertTableName).push(tableChange.value);
      }
    }

    if (tableChange.type === 'update') {
      const updateTableName = tcpLength === 1 ?
        this.tableNames.get('main') :
        this.tableNames.get(tableChange.position[tcpLength - 1].column);

      if (tcpLength > 1) {
        tableChange.position[tcpLength - 1].row[this.columnToFill.get(updateTableName)] =
          tableChange.position[tcpLength - 2].row;
      }




      const candidate = Lodash.find(this.insertCandidatas.get(updateTableName), tableChange.position[tcpLength - 1].row);
      if (candidate === undefined) {
        const column = tableChange.position[tcpLength - 1].column;
        const fromValue = Lodash.clone(tableChange.position[tcpLength - 1].row);
        fromValue[column] = tableChange.value.fromValue;
        const toValue = tableChange.position[tcpLength - 1].row;
        const updateTableName = tcpLength === 1 ?
          this.tableNames.get('main') :
          this.tableNames.get(tableChange.position[tcpLength - 2].column);

        console.log(updateTableName);
        console.log(fromValue, toValue);
        const result = await this.crudService.update(updateTableName, fromValue, toValue);
        console.log('result = ', result);
      } else {
        const toValue = tableChange.position[tcpLength - 1].row;
        const result = await this.crudService.insert(updateTableName, toValue);
        if (result.success === true) {
          Lodash.remove(this.insertCandidatas.get(updateTableName), tableChange.value);
        }
        return result;
      }
    }
  }

  async makeChanges(tableNames: Map<string, string>, tableChange: TableChange) {
    switch (tableChange.type) {
      case 'update':
        const column = tableChange.position[tableChange.position.length - 1].column;
        const fromValue = Lodash.clone(tableChange.position[tableChange.position.length - 1].row);
        fromValue[column] = tableChange.value.fromValue;
        const toValue = tableChange.position[tableChange.position.length - 1].row;
        const updateTableName = tableChange.position.length === 1 ?
          tableNames.get('main') :
          tableNames.get(tableChange.position[tableChange.position.length - 2].column);
        return await this.crudService.update(updateTableName, fromValue, toValue);
      case 'insert':
        const insertTableName = tableChange.position.length === 0 ?
          tableNames.get('main') :
          tableNames.get(tableChange.position[tableChange.position.length - 1].column);
        return await this.crudService.insert(insertTableName, tableChange.value);
      case 'delete':
        const deleteTableName = tableChange.position.length === 0 ?
          tableNames.get('main') :
          tableNames.get(tableChange.position[tableChange.position.length - 1].column);
        return await this.crudService.delete(deleteTableName, tableChange.value);
    }
  }
}