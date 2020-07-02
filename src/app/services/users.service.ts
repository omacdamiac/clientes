import { Injectable } from '@angular/core';
import { UserInterface } from "../models/user-interface";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public selectedUser: UserInterface = {
    $keyRegistro:null,
    name: '',
    lastname: '',
    age: 0,
    birthday: ''
  }
  userList: AngularFireList<any>;

  constructor(private fire: AngularFireDatabase) { }

  allUsers(){
    return this.userList= this.fire.list('clientes');
  }

  saveUser(user: UserInterface):void{
    this.userList.push({
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      birthday: user.birthday
    });
  }
  
  updateUser(user: UserInterface):void{
    this.userList.update(user.$keyRegistro, {
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      birthday: user.birthday
    });
  }

  deleteUser($keyRegistro: string){
    this.userList.remove($keyRegistro);
  }
}
