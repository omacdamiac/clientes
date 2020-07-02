import { Component, OnInit } from '@angular/core';
import { UserInterface } from "../../models/user-interface";
import { UsersService } from "../../services/users.service";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userList: UserInterface[];
  todoForm: FormGroup;
  edad;
  constructor(public fb: FormBuilder, public _api: UsersService, public router: Router, public modal: MatDialog) {
  }

  ngOnInit() {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: '',
      birthday: ['', Validators.required],
      $keyRegistro: ''
    });
  }

  onSaveUser(formUser: NgForm){
    this._api.allUsers();

    if (formUser.value.$keyRegistro == null) {
      this._api.saveUser(formUser.value);
      this.router.navigate(['/lista_clientes']);
    } else {
      this._api.updateUser(formUser.value);
      this.router.navigate(['/lista_clientes']);
    }
  }

  createForm(){
    this._api.selectedUser = {
      $keyRegistro:null,
      name: '',
      lastname: '',
      age: 0,
      birthday: ''
    }
  }

  onReset(){
    this.createForm();
    this.modal.closeAll();

  }

  edadw():void{
    let n = this.getAge() + 0;
    this._api.selectedUser.age = n;
  }

  getAge(){
    var hoy = new Date();
    var hb = new Date(this._api.selectedUser.birthday);
    var edad = hoy.getFullYear() - hb.getFullYear();
    var d = hoy.getMonth() - hb.getMonth();
    if (d < 0 ||(d === 0 && hoy.getDate() < hb.getDate())) {
      edad--;      
    }
    return edad;
  }

}
