import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './components/new-user/new-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  {path: 'formulario_cliente', component: NewUserComponent},
  {path: 'lista_clientes', component: ListUsersComponent},
  {path: '', component: NewUserComponent},
  {path: '**', redirectTo:'formulario_cliente', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
