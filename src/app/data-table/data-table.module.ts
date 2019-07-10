import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableComponent } from './data-table/data-table.component';
import { EditableValueComponent } from './editable-value/editable-value.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { FocusDirective } from './focus/focus.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatDividerModule, MatSortModule, MatAutocompleteModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [DataTableComponent, EditableValueComponent, TableHeaderComponent, FocusDirective],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    MatTableModule, MatCheckboxModule, MatInputModule,
    MatButtonModule, MatDividerModule, MatSortModule, 
    MatPaginatorModule, MatAutocompleteModule,
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
