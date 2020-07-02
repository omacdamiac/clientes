import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes-routing.module';

import { MatGridListModule } from '@angular/material/grid-list';
import {  MatDialogModule,
  MatPaginatorModule,
  MatTableModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ListUsersComponent } from './list-users.component';


@NgModule({
  declarations: [
    ListUsersComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    HttpClientModule,
    CommonModule,
    ChartsModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
