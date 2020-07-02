import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersService } from './services/users.service'

//firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from "../environments/environment";


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule,
          MatDialogModule,
          MatPaginatorModule,
          MatTableModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NewUserComponent } from './components/new-user/new-user.component';



@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    NewUserComponent
  ],
  entryComponents: [NewUserComponent],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
