import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Lodash from 'lodash';
import { TableChange } from '../data-table/data-table/data-table.component';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  baseUrl = 'http://localhost:3200/';

  constructor(private http: HttpClient) { }

  find(table: string): Observable<object[]> {
    const rows = this.http.post<object[]>(this.baseUrl + 'find', { table: table });
    return rows;
  }

  async update(table: string, where: object, update: object) {
    return await this.http.post<object[]>(this.baseUrl + 'update', { table: table, where: where, update: update }).toPromise();

  }

  async insert(table: string, entities: object[] | object): Promise<any> {
    return this.http.post<string>(this.baseUrl + 'insert', { table: table, entities: entities }).toPromise();
  }

  async delete(table: string, entities: object[] | object) {
    return await this.http.post<string>(this.baseUrl + 'delete', { table: table, entities: entities }).toPromise();
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
        return await this.update(updateTableName, fromValue, toValue);
      case 'insert':
        const insertTableName = tableChange.position.length === 0 ?
          tableNames.get('main') :
          tableNames.get(tableChange.position[tableChange.position.length - 1].column);
        return await this.insert(insertTableName, tableChange.value);
      case 'delete':
        const deleteTableName = tableChange.position.length === 0 ?
          tableNames.get('main') :
          tableNames.get(tableChange.position[tableChange.position.length - 1].column);
        return await this.delete(deleteTableName, tableChange.value);
    }
  }

}
