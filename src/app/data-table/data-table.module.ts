import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableComponent } from './data-table/data-table.component';
import { EditableValueComponent } from './editable-value/editable-value.component';
import { TableHeaderComponent } from './table-header/table-header.component';

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
import { EditableTableComponent } from './editable-value/editable-table/editable-table.component';

import { CloseAutocompleteDirective } from './editable-value/close-autocomplete.directive';
import { FocusDirective } from './editable-value/focus.directive';

import { EditableOpenTableComponent } from './editable-value/editable-table/editable-open-table/editable-open-table.component';
import { EditableObjectComponent } from './editable-value/editable-object/editable-object.component';
import { EditableOpenObjectComponent } from './editable-value/editable-object/editable-open-object/editable-open-object.component';
import { EditableArrayComponent } from './editable-value/editable-array/editable-array.component';
import { EditableOpenArrayComponent } from './editable-value/editable-array/editable-open-array/editable-open-array.component';
import { EditableBooleanComponent } from './editable-value/editable-boolean/editable-boolean.component';


@NgModule({
  declarations: [
    DataTableComponent, EditableValueComponent, TableHeaderComponent,
    FocusDirective, CloseAutocompleteDirective, EditableTextComponent, EditableNumberComponent,
    EditableDateComponent, EditableTableComponent, EditableOpenTableComponent,
    EditableObjectComponent, EditableOpenObjectComponent, EditableArrayComponent, EditableOpenArrayComponent, EditableBooleanComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatTableModule, MatCheckboxModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatSortModule,
    MatPaginatorModule, MatAutocompleteModule, MatDatepickerModule,
    MatNativeDateModule, MatIconModule, MatDialogModule
  ],
  exports: [DataTableComponent],
  entryComponents: [EditableOpenObjectComponent, EditableOpenTableComponent, EditableOpenArrayComponent],
})
export class DataTableModule { }
