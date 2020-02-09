import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TableModification } from 'gdr-data-table';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  baseUrl = 'http://localhost:3200/';

  constructor(private http: HttpClient) { }

  find(table: string): Observable<any[]> {
    const rows = this.http.post<any[]>(this.baseUrl + 'find', { table });
    return rows;
  }

  async update(table: string, where: object, update: object): Promise<boolean> {
    const result = await this.http.post<any>(this.baseUrl + 'update', { table, where, update }).toPromise();
    return result.success;
  }

  async insert(table: string, entities: object[] | object): Promise<boolean> {
    const result = await this.http.post<any>(this.baseUrl + 'insert', { table, entities }).toPromise();
    return result.success;
  }

  async delete(table: string, entities: object[] | object): Promise<boolean> {
    const result = await this.http.post<any>(this.baseUrl + 'delete', { table, entities }).toPromise();
    return result.success;
  }

  async modify(table: string, modification: any) {
    const result = await this.http.post<any>(this.baseUrl + 'modify', { table, modification }).toPromise();
    return result.success;
  }

  getTypes(table: string) {
    const types = this.http.post<any[]>(this.baseUrl + 'clientTypes', { table });
    return types;
  }

  getSchedule(): Observable<any[]>  {
    const rows = this.http.post<any[]>(this.baseUrl + 'schedule', { productOrders: undefined });
    return rows;
  }

}
