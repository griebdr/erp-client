import { TableFeatures } from '../data-table/data-table.component';

export type EditableTypeName = 'Text' | 'Number' | 'Date' | 'AutocompleteMap' | 'Table';
export type EditableTypeInfo = AutocompleteMapInfo | TableInfo;

export type EditableType = {
  name: EditableTypeName,
  info?: EditableTypeInfo,
}

export class AutocompleteMapInfo {
  map: (value: any) => any;
  options: object[];
}

export class TableInfo {
  displayedColumns: string[];
  columnNames: Map<string, string>;
  columnTypes: Map<string, EditableType>;
  features?: TableFeatures;
}

export class TableModification {
  type: 'insert' | 'delete' | 'update';
  value: any;
}

