import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserInterface } from "../../models/user-interface";
import { UsersService } from "../../services/users.service";
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { NewUserComponent } from 'src/app/components/new-user/new-user.component';
import { NgForm, FormGroup } from "@angular/forms";

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  public polarAreaChartLabels: string[] = [];
  public polarAreaChartData: number[] = [];
  public polarAreaChartType: string = 'polarArea';


  public usersList: UserInterface[] = [];
  todoForm: FormGroup;
  displayedColumns: string[] = ['name', 'lastname', 'age', 'birthday', 'acciones'];
  public dataSource : any;
  constructor(public _api: UsersService,
              public modal: MatDialog,
              public router: Router,
              public location: Location) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;  
  @ViewChild("showAverage", {static: true}) prom: ElementRef;
  @ViewChild("showDESTANDAR", {static: true}) dStandar: ElementRef;

  ngOnInit() {
    this.getAllUsers();
    setTimeout(() => {
      this.viewChart();

      this.average();
      this.desviacionEstandar();
    }, 3000);
    
  }

  viewChart(){
    let chartAge:number = 0, chartName = '';
    for (let i in this.usersList) {
      chartAge = this.usersList[i].age;
      chartName =this.usersList[i].name;
      this.polarAreaChartData.push(chartAge);
      this.polarAreaChartLabels.push(chartName);
    }

  }

  getAllUsers(){
    this._api.allUsers().snapshotChanges()
    .subscribe(item => {
    this.usersList = [];

      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$keyRegistro'] = element.key;
        this.usersList.push(x as UserInterface);
      });
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.paginator = this.paginator;
  

    });

  }

  onPreUpdateUser(user: UserInterface){
    this.modal.open(NewUserComponent, {disableClose: true});
    this._api.selectedUser = user;
  }

  onDeleteUser($key: string):void{
    if (confirm('¿Eliminar registro?')) {
      this._api.deleteUser($key);
      this.loadComponent();
    }
  }

  loadComponent():void{
    this.router.navigateByUrl('/formulario_cliente',{skipLocationChange: true}).then(() => {
    this.router.navigate([decodeURI(this.location.path())]);
    })
  }

  userFilter(filterValue: string){
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue
  }

  average(){
    var promAge = this.usersList.reduce((acumulador, siguienteValor) => {
      return {
        age: acumulador.age + siguienteValor.age
      };
    }, {age: 0});
    var countAge = this.usersList.length;
    var prom = promAge.age/countAge;

    this.prom.nativeElement.value = prom;
    return prom;
  }

  desviacionEstandar(){
    //1.CALCULAR LA MEDIA
    var media:any = this.average(),
    suma= 0;

    //2.CALCULAR EL CUADRADO DISTANCIA DE LA MEDIA PARA CADA DATO
    for (let item of this.usersList) {
      // suma += this.usersList[item].age;
      var distancia = item.age - media;
      var cdr = Math.pow(distancia, 2);
    //3.SUMA DE LOS VALORES
      suma += cdr;
    }
    
    //4. DIVIDIR ENTRE EL NÚMERO DE DATOS
    var dividir = suma / this.usersList.length;

    //5. RAÍZ CUADRADA
    var rCdr = Math.sqrt(dividir);
    var dEstandar = Math.round(rCdr);

    this.dStandar.nativeElement.value = dEstandar;

    console.log('desviación estandar: ' + dEstandar);

  }

}