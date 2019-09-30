import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AutocompleteMapInfo } from '../editable-type';
import * as Lodash from 'lodash';

@Component({
  selector: 'app-editable-autocomplete-map',
  templateUrl: './editable-autocomplete-map.component.html',
  styleUrls: ['./editable-autocomplete-map.component.scss']
})
export class EditableAutocompleteMapComponent implements OnInit {
  @Input() typeInfo: AutocompleteMapInfo;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  open = false;

  filteredOptions: Observable<string[]>;
  valueControl = new FormControl();

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.valueControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const options = this.typeInfo.options.map((option) => this.typeInfo.map(option))
    const filterValue = value.toLowerCase();
    return options.filter((option: string) => option.toLowerCase().includes(filterValue));
  }

  @Input() set value(value: string) {
    if (value !== undefined) {
      this.valueControl.setValue(this.typeInfo.map(value)); 
    }
  };

  get value() {
    return this.valueControl.value;
  }

  onSave() {
    const value = Lodash.find(this.typeInfo.options, (option) => this.typeInfo.map(option) === this.valueControl.value);
    this.save.emit(value);
  }
}
