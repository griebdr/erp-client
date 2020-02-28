import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { DataTableModule } from './data-table/data-table.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { SuppliesComponent } from './supplies/supplies.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';

// import { DataTableModule } from 'gdr-data-table';
import { MainComponent } from './main/main.component';
import { SupplyOrdersComponent } from './supply-orders/supply-orders.component';
import { ProductOrdersComponent } from './product-orders/product-orders.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { EmployeesComponent } from './employees/employees.component';
import { SkillsComponent } from './skills/skills.component';
import { ToolsComponent } from './tools/tools.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { DataTableModule } from './data-table/data-table.module';
import { GenericTableComponent } from './generic-table/generic-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SuppliesComponent,
    ProductsComponent,
    MainComponent,
    SupplyOrdersComponent,
    ProductOrdersComponent,
    ShiftsComponent,
    EmployeesComponent,
    SkillsComponent,
    ToolsComponent,
    ScheduleComponent,
    GenericTableComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    DataTableModule,
    HttpClientModule, FormsModule, ReactiveFormsModule,
    MatCheckboxModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatMenuModule, MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
