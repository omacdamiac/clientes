import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewUserComponent } from 'src/app/components/new-user/new-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'usuarios';

  constructor(public modal: MatDialog){}

  openNewUser(){
    this.modal.open(NewUserComponent);
  }
}
