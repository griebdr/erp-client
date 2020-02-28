export type EditableType = 'string' | 'number' | 'boolean' | 'date' | 'table';

export interface ColumnType {
  name: string;
  type: EditableType;
  options?: TextOptions | ObjectOptions | TableOptions;
}

export type PropertyType = ColumnType;

export class TextOptions {
  options?: any[];
  map?: (value: any) => string;
  remap?: (originalValue: any, mappedValue: string) => any;
}

export class ObjectOptions {
  propertyTypes?: ColumnType[];
  map?: (value: any) => string;
}

export class TableOptions {
  columnTypes?: ColumnType[];
  clientDbMap?: { dbValue: any, clientValue: any }[];
  close?: boolean;
}



