export class EditableType {
  name: 'String' | 'Number' | 'Date' | 'AutocompleteMap' | 'Table';
  info?: AutocompleteMapInfo | TableInfo; 
}

export class AutocompleteMapInfo {
  map: (value: any) => any;
  options: object[];
}

export class TableInfo {
  displayedColumns: string[];
  columnNames: Map<string, string>;
  columnTypes: Map<string, EditableType>;
}

