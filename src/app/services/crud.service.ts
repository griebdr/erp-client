import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  async update(table: string, where: object, update: object): Promise<boolean> {
    const result = await this.http.post<any>(this.baseUrl + 'update', { table: table, where: where, update: update }).toPromise();
    return result.success;
  }

  async insert(table: string, entities: object[] | object): Promise<boolean> {
    const result = await this.http.post<any>(this.baseUrl + 'insert', { table: table, entities: entities }).toPromise();
    return result.success;
  }

  async delete(table: string, entities: object[] | object): Promise<boolean> {
    const result = await this.http.post<any>(this.baseUrl + 'delete', { table: table, entities: entities }).toPromise();
    return result.success;
  }

}
