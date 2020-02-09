import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextOptions } from '../editable-type';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'gdr-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit {
  @Input() options: TextOptions;

  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<string>();

  open = false;
  valueControl = new FormControl();
  value2: any;

  filteredOptions: Observable<string[]>;

  constructor() {

  }

  ngOnInit() {
    if (!this.options) {
      this.options = {};
    }

    if (!this.options.map) {
      this.options.map = (value) => value;
      this.options.remap = (originalValue, mappedValue) => mappedValue;
    }

    if (!this.options.options) {
      this.options.options = [];
    }

    this.filteredOptions = this.valueControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );

    this.valueControl.setValue(this.options.map(this.value2));
  }

  @Input() set value(value: any) {
    if (!value) {
      this.value2 = value = '';
    } else {
      this.value2 = value;
    }

    if (this.options && this.options.map) {
      value = this.options.map(value);
    }

    this.valueControl.setValue(value);
  }

  get value() {
    return this.valueControl.value;
  }

  onSave() {
    const value = this.valueControl.value;
    this.value2 = this.options.remap(this.value2, value);
    this.save.emit(this.value2);
  }

  private filter(value: string): string[] {
    const options = this.options.options.map((option) => this.options.map(option));
    const filterValue = value.toLowerCase();
    return options.filter((option: string) => option.toLowerCase().includes(filterValue));
  }
}
