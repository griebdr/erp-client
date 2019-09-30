import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableComponent } from './data-table/data-table.component';
import { EditableValueComponent } from './editable-value/editable-value.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { FocusDirective } from './focus/focus.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatTableModule, MatCheckboxModule, MatInputModule,
  MatButtonModule, MatDividerModule, MatSortModule,
  MatAutocompleteModule, MatPaginatorModule, MatDatepickerModule, 
  MatNativeDateModule, MatIconModule, MatDialogModule
} from '@angular/material';
import { EditableTextComponent } from './editable-value/editable-text/editable-text.component';
import { EditableNumberComponent } from './editable-value/editable-number/editable-number.component';
import { EditableDateComponent } from './editable-value/editable-date/editable-date.component';
import { EditableAutocompleteMapComponent } from './editable-value/editable-autocomplete-map/editable-autocomplete-map.component';
import { EditableTableComponent } from './editable-value/editable-table/editable-table.component';
import { CloseAutocompleteDirective } from './editable-value/close-autocomplete.directive';
import { TableInsertComponent } from './table-insert/table-insert.component';


@NgModule({
  declarations: [
    DataTableComponent, EditableValueComponent, TableHeaderComponent,
    FocusDirective, EditableTextComponent, EditableNumberComponent,
    EditableDateComponent, EditableAutocompleteMapComponent, EditableTableComponent, CloseAutocompleteDirective, TableInsertComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatTableModule, MatCheckboxModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatSortModule,
    MatPaginatorModule, MatAutocompleteModule, MatDatepickerModule,
    MatNativeDateModule, MatIconModule, MatDialogModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
