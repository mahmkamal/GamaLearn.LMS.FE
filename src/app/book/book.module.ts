import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

@NgModule({
  imports: [
    TableModule,
    MultiSelectModule,
    InputSwitchModule,
    FieldsetModule,
    CommonModule,
    BookRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    VirtualScrollerModule,
    ConfirmationPopoverModule.forRoot({ confirmButtonType: 'danger' })
  ],
  declarations: [BookComponent]
})
export class BookModule { }
